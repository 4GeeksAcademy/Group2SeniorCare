# """
# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
# """
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Caregiver, UserRequestCaregiver
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import func 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime
from pytz import UTC
from api.decorators import caregiver_required, patient_required


api = Blueprint('api', __name__)

# # Allow CORS requests to this API
CORS(api)


@api.route('/user/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    print("Received data:", data)

    name = data.get('name')
    date_of_birth = data.get('date_of_birth')  
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
        # is_active=True 
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

    access_token = create_access_token(
        identity=user.id,
        additional_claims={"role": "patient"}
        )
    return jsonify({"token":access_token}), 200

@api.route('/user', methods=['GET'])
@patient_required()
def get_userprofile():
    user = User.query.filter_by(id = get_jwt_identity()).first()
    if user is None:
        return jsonify({'msg': "There's no patient with this id"}), 404
        
    return jsonify({'msg': 'User profile info', 'user': user.serialize()}), 200

@api.route('/user', methods=['PUT'])
@patient_required()
def edit_user():
    # Get the current user based on JWT token
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    
    # If the user doesn't exist, return a 404 error
    if user is None:
        return jsonify({'msg': "There's no user with this id"}), 404

    # Get the data from the request
    data = request.get_json()

    # Check if the data exists
    if not data:
        return jsonify({'msg': 'No data provided'}), 400

    # Update the user's fields based on the provided data
    user.name = data.get('name', user.name)
    user.date_of_birth = data.get('date_of_birth', user.date_of_birth)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.emergency_contact = data.get('emergency_contact', user.emergency_contact)
    user.allergies = data.get('allergies', user.allergies)
    user.blood_type = data.get('blood_type', user.blood_type)
    user.hobbies = data.get('hobbies', user.hobbies)
    user.is_active = data.get('is_active', user.is_active)
    user.is_current = data.get('is_current', user.is_current)

    try:
        # Commit the changes to the database
        db.session.commit()
        return jsonify({'msg': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()  # Roll back in case of error
        return jsonify({'msg': 'Failed to update user', 'error': str(e)}), 500

@api.route('/caregiver', methods=['PUT'])
@caregiver_required()
def edit_caregiver():
    # Get the current caregiver based on JWT token
    caregiver_id = get_jwt_identity()
    caregiver = Caregiver.query.filter_by(id=caregiver_id).first()
    
    # If the caregiver doesn't exist, return a 404 error
    if caregiver is None:
        return jsonify({'msg': "There's no caregiver with this id"}), 404

    # Get the data from the request
    data = request.get_json()

    # Check if the data exists
    if not data:
        return jsonify({'msg': 'No data provided'}), 400

    # Update the caregiver's fields based on the provided data
    caregiver.name = data.get('name', caregiver.name)
    caregiver.email = data.get('email', caregiver.email)
    caregiver.phone = data.get('phone', caregiver.phone)
    caregiver.location = data.get('location', caregiver.location)
    caregiver.experience = data.get('experience', caregiver.experience)
    caregiver.qualifications = data.get('qualifications', caregiver.qualifications)
    caregiver.availability = data.get('availability', caregiver.availability)
    caregiver.gender = data.get('gender', caregiver.gender)

    try:
        # Commit the changes to the database
        db.session.commit()
        return jsonify({'msg': 'Caregiver updated successfully'}), 200
    except Exception as e:
        db.session.rollback()  # Roll back in case of error
        return jsonify({'msg': 'Failed to update caregiver', 'error': str(e)}), 500


    

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

    access_token = create_access_token(
        identity=user.id,
        additional_claims={"role": "caregiver"}
        )
    return jsonify(access_token=access_token), 200

@api.route('/caregiver/signup', methods=['POST'])
def signup_caregiver ():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    experience = data.get('experience')
    qualifications = data.get('qualifications')
    availability = data.get('availability')
    location = data.get('location')
    password = data.get('password')
    gender = data.get('gender')

    if name is None or email is None or phone is None or experience is None or qualifications is None or availability is None or location is None or password is None or gender is None : 
        return jsonify({"msg":"some fields are missing in your request"}), 400


    if name and password: 
        existing_user = Caregiver.query.filter_by(name=name).first()
        if existing_user: 
                return jsonify({'error': 'Username and password already exist'}), 400
        else:
             new_user = Caregiver(
                name=name, 
                password=password,
                email = email,
                phone = phone,
                experience = experience,
                qualifications = qualifications,
                availability = availability,
                location = location,
                gender = gender,
                is_active= True,
                is_current=False
                 
                 )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Username and password successfully created'}), 200
             
    else: 
         return jsonify({'error': 'Username and password are required'}), 400

@api.route('/caregiver', methods=['GET'])
@caregiver_required()
def get_profile():
    caregiver = Caregiver.query.filter_by(id = get_jwt_identity()).first()
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
                "date_time": request.date_time,
                "request_id": request.id,
                "appointment_reason":request.appointment_reason,
                "patient": patient.serialize()
            }
            serialized_requests.append(request_details)
    serialized_caregiver["requests"] = serialized_requests
    return jsonify({'msg': 'Caregiver profile info', 'caregiver': serialized_caregiver}), 200
    
@api.route('/caregivers', methods=['GET'])
@patient_required()
def get_caregivers():
    # Get query parameters from the request
    location = request.args.get('location')
    experience = request.args.get('experience', type=int)  # Ensure experience is treated as an integer
    gender = request.args.get('gender')

    # Build the query. Obtains all caregivers in database. 
    query = Caregiver.query

    # Apply filters based on the query parameters
    if location:
        query = query.filter_by(location=location)
    
    if experience:
        query = query.filter(Caregiver.experience >= experience)
    
    if gender:
        query = query.filter_by(gender=gender)

    # Execute the query and get all matching caregivers
    caregivers = query.all()

    if not caregivers:
        return jsonify({'caregivers': []}), 200  # Return an empty list if no caregivers match

    # Serialize the caregivers and return the response
    caregivers_list = [caregiver.serialize() for caregiver in caregivers]
    
    return jsonify({'caregivers': caregivers_list}), 200

#This is for the user to request for an appointment from the caregiver 

@api.route('/request-caregiver', methods=['POST'])
@patient_required()
def request_caregiver():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    caregiver_id = data.get('caregiver_id')
    date_time=data.get("date_time")
    appointment_reason=data.get("appointment_reason")
    

    print("received date_time:", date_time)

    if not caregiver_id:
        return jsonify({'error': "caregiver id is required."}), 400

    new_request = UserRequestCaregiver(
        user_id = current_user_id, 
        caregiver_id = caregiver_id,
        request_status = "Pending",
        date_time=datetime.now(UTC),
        appointment_reason = appointment_reason,
    )

    db.session.add(new_request)
    db.session.commit()

    return jsonify({'message': "request sent successfully." , "request": new_request.serialize()}), 200

@api.route('/caregiver/request-reply', methods=['PUT'])
@caregiver_required()
def handle_reply():
    caregiver = Caregiver.query.filter_by(id = get_jwt_identity()).first()
    patient_id=request.get_json().get("patientId")
    reply = request.get_json().get("reply")
    request_id = request.get_json().get("requestId")
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
        if patient.caregivers is None:
            patient.caregivers = []
        patient.caregivers.append(caregiver)
        request_to_accept = UserRequestCaregiver.query.filter_by(id=request_id).first()
        request_to_accept.request_status = "Accepted"
        db.session.commit()
        return jsonify({'message': "request accepted successfully."}), 200


@api.route('/appointments', methods=['GET'])
@patient_required()
def get_appointments():
    userRequestCaregivers = UserRequestCaregiver.query.all()

    return jsonify([userRequestCaregiver.serialize() for userRequestCaregiver in userRequestCaregivers]), 200



    

