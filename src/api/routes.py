"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Caregiver, UserRequestCaregiver
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/user/signup', methods=['POST'])
@jwt_required()
def signup_user(request):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    location= data.get('location')

    if username and password: 
        existing_user = User.query.filter_by(username=username).first()
        if existing_user: 
                return jsonify({'error': 'Username and password already exist'}), 400
        else:
             new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Username and password successfully created'}), 200
             
    else: 
         return jsonify({'error': 'Username and password are required'}), 400
    
    

@api.route('/login/user', methods=['POST'])
@jwt_required()
def login (request):
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

@api.route('/login/cargiver', methods=['POST'])
@jwt_required()
def login_caregiver (request):
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
@jwt_required()
def signup_caregiver (request):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    location= data.get('location')

    if username and password: 
        existing_user = Caregiver.query.filter_by(username=username).first()
        if existing_user: 
                return jsonify({'error': 'Username and password already exist'}), 400
        else:
             new_user = Caregiver(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Username and password successfully created'}), 200
             
    else: 
         return jsonify({'error': 'Username and password are required'}), 400


@api.route('/caregiver', methods=['GET'])
@jwt_required()
def get_profile ():
     caregiver_id = get_jwt_identity()

     
     
    
@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    
    email = get_jwt_identity()
    dictionary = {

        "message": "hello world" + email
    }
    return jsonify(dictionary)
       
    

    




    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
