from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db =SQLAlchemy()


# 3RD MODEL
class User(db.Model):
    __tablename__ ='user'
    id =db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(120), unique=False, nullable=False )
    date_of_birth=db.Column(db.Date(), unique=False, nullable=False)
    email =db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=False, nullable=True)
    emergencyContact = db.Column(db.String(120), unique=False, nullable=True)
    password =db.Column(db.String(80), unique=False, nullable=False)
    allergies=db.Column(db.String(120), unique=False, nullable=True)
    bloodType=db.Column(db.String(120), unique=False, nullable=True)
    hobbies=db.Column(db.String(300),unique=False, nullable=True)
    is_active =db.Column(db.Boolean(), unique=False, nullable=False)
    # 
    requests =db.relationship("UserRequestCaregiver", back_populates="user")
    caring_caregiver_id = db.Column(db.Integer, ForeignKey('caregiver.id'))
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "email": self.email,
            "phone": self.phone,
            "emergencyContact": self.emergencyContact,
            "allergies": self.allergies,
            "bloodType": self.bloodType,
            "hobbies": self.hobbies,
            "is_active": self.is_active,
            "caring_caregiver_id": self.caring_caregiver_id,
            # do not serialize the password, it's a security breach
        }

    

# 3RD MODEL
class Caregiver(db.Model):
    __tablename__ ='caregiver'
    id =db.Column(db.Integer, primary_key=True)
    email =db.Column(db.String(120), unique=True, nullable=False)
    password =db.Column(db.String(80), unique=False, nullable=False)
    credentials =db.Column(db.String(120), unique=False, nullable=False)
    experience =db.Column(db.Numeric(), nullable=False)
    location = db.Column(db.String(120), nullable=False)

    is_active =db.Column(db.Boolean(), unique=False, nullable=False)
    # 
    requests =db.relationship("UserRequestCaregiver", back_populates="caregiver")
    caring_users =db.relationship("User")
    def __repr__(self):
        return f'<Caregiver {self.email}>'

    def serialize(self):
        return { 
            "id": self.id,
            "email": self.email,
            "credentials": self.credentials,
            "experience": self.experience,
            "location": self.location,
            "caring_users": [user.serialize() for user in self.caring_users],
            
            # do not serialize the password, its a security breach
        }

# 3RD MODEL
class UserRequestCaregiver(db.Model):
    __tablename__ ='user_request_caregiver'
    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    caregiver_id=db.Column(db.Integer, ForeignKey('caregiver.id'), nullable=False)
    request_status=db.Column(db.String(80), nullable=False, default='Pending')
    request_time=db.Column(db.Integer, nullable=True)
    # 
    user=db.relationship("User", back_populates="requests")
    caregiver=db.relationship("Caregiver", back_populates="requests")


    def accept_request(self):
        self.request_status = 'Accepted'
        User.caring_caregiver_id = self.caregiver_id
        db.session.commit()
        
    def denied_request(self):
        self.request_status = 'Denied'
        db.session.commit()
        
    def __repr__(self):
        return f'<User {self.user} is undercare for Caregiver {self.caregiver}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "caregiver_id": self.caregiver_id,
            "request_status": self.request_status,
            "request_time": self.request_time,
            "user_assigned": self.user,
            "caregiver_assigned": self.caregiver
            # do not serialize the password, its a security breach
        }

# class Appointment(db.Model):
#     __tablename__ ='appointment'
#     id=db.Column(db.Integer, primary_key=True)
#     caregiver_id=db.Column(db.Integer, ForeignKey('caregiver.id'), nullable=False)
#     user_id=db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
#     time=db.Column(db.Integer, nullable=False)
#     appointment_reason=db.Column(db.String(120), nullable=False)
#     user=db.relationship("User", back_populates="requests")
#     caregiver=db.relationship("Caregiver", back_populates="requests")

#     def __repr__(self):
#         return f'<User {self.user} is undercare for Caregiver {self.caregiver}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "caregiver_id": self.caregiver_id,
#             "time": self.time,
#             "appointment_reason": self.appointment_reason,
#             "user": self.user.serialize(),
#             # do not serialize the password, its a security breach
#         }

    

