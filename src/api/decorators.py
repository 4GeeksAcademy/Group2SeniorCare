from functools import wraps

from flask import Flask
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request

def caregiver_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") == "caregiver":
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Caregivers only!"), 403

        return decorator

    return wrapper

def patient_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") == "patient":
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Patients only!"), 403

        return decorator

    return wrapper