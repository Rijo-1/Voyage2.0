import os
from dotenv import load_dotenv

load_dotenv()  


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
    MONGO_URI = os.getenv("MONGO_URI")  
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "bM!v2tD8@G#f9ZpX4q$wL7yHk%N3R&aU5*JhC6xQ")  # need to check if works without next parameter
