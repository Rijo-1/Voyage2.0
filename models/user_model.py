from flask import current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

#user model has username,email,password and phone number
class User:
    @staticmethod
    def create_user(username, email, phone, password):
        password_hash = generate_password_hash(password)
        user_id = app.mongo.db.users.insert_one(
            {
                "username": username,
                "email": email,
                "phone": phone,
                "password": password_hash,
            }
        ).inserted_id
        return user_id

    @staticmethod
    def find_user_by_email(email):
        return app.mongo.db.users.find_one({"email": email})

    @staticmethod
    def verify_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
