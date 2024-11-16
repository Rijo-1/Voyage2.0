# auth/utils.py
from flask_jwt_extended import create_access_token, decode_token
from flask import current_app
import datetime


def generate_token(user_id):
    """Generate a JWT token for user authentication"""
    return create_access_token(
        identity=str(user_id), expires_delta=datetime.timedelta(hours=1)
    )


def verify_token(token):
    """Verify if JWT token is valid"""
    try:
        decoded = decode_token(token)
        return decoded, None
    except Exception as e:
        return None, str(e)
