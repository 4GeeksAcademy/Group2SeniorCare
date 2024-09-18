# """
# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
# """
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Caregiver, UserRequestCaregiver
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)

# # Allow CORS requests to this API
CORS(api)


@api.route('/user/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    print("Received data:", data)

    name = data.get('name')
    date_of_birth = data.get('dob')  
    email = data.get('email')
    password = data.get('password')
    if not name or not date_of_birth or not email or not password:
        return jsonify({'error': 'Name, Date of Birth, Email, and Password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400
    new_user = User(
        name=name,
        date_of_birth=date_of_birth,
        email=email,
        password=password,
        is_active=True 
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=new_user.id)
        return jsonify({'message': 'User successfully created', 'access_token': access_token}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@api.route('/login/user', methods=['POST'])
def login ():
    print("login route hit")
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({"msg": "Please provide password and email"}), 400
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "This account does not exist"}), 404
    if user.password != password: 
        return jsonify({"msg": "The password provided does not match our records"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/User', methods=['GET'])
@jwt_required()
def get_userprofile():
    user = User.query.filter_by(id = get_jwt_identity()).first()
    if user is None:
        return jsonify({'msg': "There's no patient with this id"}), 404
        
    return jsonify({'msg': 'User profile info', 'user': user.serialize()}), 200

@api.route('/Caregiver', methods=['GET'])
@jwt_required()
def get_caregiverprofile():
    user = Caregiver.query.filter_by(id = get_jwt_identity()).first()
    if Caregiver is None:
        return jsonify({'msg': "There's no cargiver with this id"}), 404
        
    return jsonify({'msg': 'Cargiver profile info', 'caegiver': user.serialize()}), 200
    

@api.route('/login/caregiver', methods=['POST'])
def login_caregiver ():
    print("login route hit")
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({"msg": "Please provide password and email"}), 400
    user = Caregiver.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "This account does not exist"}), 404
    if user.password != password: 
        return jsonify({"msg": "The password provided does not match our records"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@api.route('/caregiver/signup', methods=['POST'])
def signup_caregiver ():
    data = request.get_json()
    fullname = data.get('fullname')
    email = data.get('email')
    phone = data.get('phone')
    experience = data.get('experience')
    qualifications = data.get('qualifications')
    availability = data.get('availability')
    location = data.get('location')
    
    password = data.get('password')


    if fullname and password: 
        existing_user = Caregiver.query.filter_by(fullname=fullname).first()
        if existing_user: 
                return jsonify({'error': 'Username and password already exist'}), 400
        else:
             new_user = Caregiver(
                 fullname=fullname, 
                 password=password,
                 email = email,
                phone = phone,
                experience = experience,
                qualifications = qualifications,
                availability = availability,
                location = location,
                 
                 )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Username and password successfully created'}), 200
             
    else: 
         return jsonify({'error': 'Username and password are required'}), 400

@api.route('/caregiver', methods=['GET'])
# @jwt_required()
def get_profile():
    # caregiver = Caregiver.query.filter_by(id = get_jwt_identity()).first()
    caregiver = Caregiver.query.filter_by(id=1).first()
    if caregiver is None:
        return jsonify({'msg': 'Caregiver with your id does not exist'}), 404
    serialized_caregiver = caregiver.serialize()
    requests = caregiver.requests
    serialized_requests = []
    for request in requests:
        print(1)
        patient = User.query.filter_by(id=request.user_id).first()
        if patient:
            request_details = {
                "request_status": request.request_status,
                "request_time": request.request_time,
                "request_id": request.id,
                "patient": patient.serialize()
            }
            serialized_requests.append(request_details)
    serialized_caregiver["requests"] = serialized_requests
    return jsonify({'msg': 'Caregiver profile info', 'caregiver': serialized_caregiver}), 200
    
@api.route('/caregivers', methods=['GET'])   
# @jwt_required() 
def get_caregivers():
    caregivers = Caregiver.query.all()
    if not caregivers:
        return jsonify({'msg': 'No caregivers found'}), 404

    caregivers_list = [caregiver.serialize() for caregiver in caregivers]  
    return jsonify({'caregivers': caregivers_list}), 200 

#This is for the user to request for an appointment from the caregiver 
@api.route('/request-caregiver', methods=['POST'])
# @jwt_required()
def request_caregiver():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    caregiver_id = data.get('caregiver_id')
    request_status = data.get('request_status', "Pending")

    if not caregiver_id:
        return jsonify({'error': "caregiver id is required."}), 400

    new_request = UserRequestCaregiver(
        user_id = current_user_id, 
        caregiver_id = caregiver_id,
        request_status = request_status
    )
    db.session.add(new_request)
    db.session.commit()

    return jsonify({'message': "request sent successfully." , "request": new_request.serialize()}), 200

@api.route('/caregiver/request-reply', methods=['PUT'])
# @jwt_required()
def handle_reply():
     # caregiver = Caregiver.query.filter_by(id = get_jwt_identity()).first()
    patient_id=request.get_json().get("patientId")
    reply = request.get_json().get("reply")
    request_id = request.get_json().get("requestId")
    caregiver = Caregiver.query.filter_by(id=1).first()
    patient = User.query.filter_by(id=patient_id).first()

    if caregiver is None:
        return jsonify({'msg': 'Caregiver with your id does not exist'}), 404
    if patient is None:
        return jsonify("Patient not found"), 404
    if None in [reply,patient_id]:
        return jsonify("Please provide the patient's id and a reply to the request")
    
    if reply == "deny":
        request_to_delete = UserRequestCaregiver.query.filter_by(id=request_id).first()
        if request_to_delete is None:
            return jsonify("Request does not exist"), 404
        db.session.delete(request_to_delete)
        db.session.commit()
        return jsonify({'message': "request denied successfully."}), 200

    else:
        patient.caring_caregiver_id=caregiver.id
        request_to_delete = UserRequestCaregiver.query.filter_by(id=request_id).first()
        if request_to_delete is None:
            return jsonify("Request does not exist"), 404
        db.session.delete(request_to_delete)
        db.session.commit()
        return jsonify({'message': "request accepted successfully."}), 200


       
    

