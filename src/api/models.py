from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime
from datetime import datetime
from flask import current_app
from pytz import timezone

db =SQLAlchemy()


caregiver_user = db.Table(
    "caregiver_user",
    db.Column("user_id", db.ForeignKey("user.id")),
    db.Column("caregiver_id", db.ForeignKey("caregiver.id")),
)

# 3RD MODEL Patient
class User(db.Model):
    __tablename__ ='user'
    id =db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(120), unique=False, nullable=False )
    date_of_birth=db.Column(db.String(120), unique=False, nullable=False)
    email =db.Column(db.String(120), unique=True, nullable=False)
    # phone = db.Column(db.String(120), unique=False, nullable=True)
    # emergencyContact = db.Column(db.String(120), unique=False, nullable=True)
    password =db.Column(db.String(80), unique=False, nullable=False)
    # allergies=db.Column(db.String(120), unique=False, nullable=True)
    # bloodType=db.Column(db.String(120), unique=False, nullable=True)
    # hobbies=db.Column(db.String(300),unique=False, nullable=True)
    # is_active =db.Column(db.Boolean(), unique=False, nullable=True)
    # is_current =db.Column(db.Boolean(), unique=False, nullable=True)


    # 
    requests =db.relationship("UserRequestCaregiver", back_populates="user")

    caregivers = db.relationship("Caregiver", secondary=caregiver_user)
    caring_caregiver_id = db.Column(db.Integer, ForeignKey('caregiver.id'),nullable=True)
    caring_caregiver=db.relationship("Caregiver", foreign_keys={caring_caregiver_id})



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "email": self.email,
            # "phone": self.phone,
            # "emergencyContact": self.emergencyContact,
            # "allergies": self.allergies,
            # "bloodType": self.bloodType,
            # "hobbies": self.hobbies,
            # "is_active": self.is_active,
            # "is_current": self.is_current, 
            # do not serialize the password, it's a security breach
        }

        #     name=name,
        # date_of_birth=date_of_birth,
        # email=email,
        # password=password,
        # is_active=True 

# 3RD MODEL


class Caregiver(db.Model):

    __tablename__ = 'caregiver'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    qualifications = db.Column(db.String(120), unique=False, nullable=False)
    phone =db.Column(db.String(10),  nullable=False)
    experience =db.Column(db.String(120),  nullable=False)
    availability =db.Column(db.String(120),  nullable=False)
    password =db.Column(db.String(80), unique=False, nullable=False)
    # experience =db.Column(db.Numeric(), nullable=False)

    location = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(10), nullable=False)  # New gender field

    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_current = db.Column(db.Boolean(), unique=False, nullable=False)

    # Relationships
    requests = db.relationship("UserRequestCaregiver", back_populates="caregiver")
    caring_users = db.relationship("User", secondary=caregiver_user)
    requests =db.relationship("UserRequestCaregiver", back_populates="caregiver")

    
    def __repr__(self):
        return f'<Caregiver {self.email}>'


    def serialize(self):
        return { 
            "id": self.id,
            "name":self.name,
            "email": self.email,
            "phone": self.phone,
            "experience": self.experience,
            "qualifications": self.qualifications,
            "availability": self.availability,
            "location": self.location,
            "gender": self.gender,  
            "is_active": self.is_active,
            "is_current": self.is_current,
            "caring_users": [user.serialize() for user in self.caring_users],
          
            
            # do not serialize the password, its a security breach
        }# 3RD MODEL
class UserRequestCaregiver(db.Model):
    __tablename__ = 'user_request_caregiver'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)  # This connects the request to a Patient
    caregiver_id = db.Column(db.Integer, ForeignKey('caregiver.id'), nullable=False)  # This connects the request to a Caregiver
    request_status = db.Column(db.String(80), nullable=False, default='Pending')
    date_time = db.Column(db.DateTime, nullable=False)
    appointment_reason = db.Column(db.String(150), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="requests")
    caregiver = db.relationship("Caregiver", back_populates="requests")
   

    

    def accept_request(self):
        """Accept the request and assign the caregiver to the user."""
        self.request_status = 'Accepted'
        if self.caregiver not in self.user.caregivers:
            self.user.caregivers.append(self.caregiver)  
        db.session.commit()

    def deny_request(self):
        """Deny the request and remove the caregiver assignment if necessary."""
        self.request_status = 'Denied'
        db.session.commit()

    def __repr__(self):
        return f'<UserRequestCaregiver {self.user_id} - {self.caregiver_id}>'

    def serialize(self):
        app_timezone = current_app.config['TIMEZONE']
        localized_time = self.date_time.replace(tzinfo=timezone('UTC')).astimezone(app_timezone)
        
        return {
            "id": self.id,
            "user_id": self.user_id,
            "caregiver_id": self.caregiver_id,
            "request_status": self.request_status,
            "date_time": localized_time.strftime('%Y-%m-%d %H:%M:%S'),
            "appointment_reason": self.appointment_reason,
            "caregiver": self.caregiver.serialize() if self.caregiver else None
        }