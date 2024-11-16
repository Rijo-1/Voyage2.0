from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from models.user_model import User
import pickle
import requests

auth_bp = Blueprint("auth", __name__)
# itinerary_bp = Blueprint("itinerary", __name__)

CORS(auth_bp)
# CORS(itinerary_bp)

# with open("recommendation_model.pkl", "rb") as f:
#     recommendation_model = pickle.load(f)

GROQ_API_URL = "https://groqapi.example.com/create_itinerary"
GROQ_API_KEY = "your_groq_api_key"



# User registration
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not all([username, email, phone, password]):
        return jsonify({"message": "All fields are required"}), 400

    if User.find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 400

    user_id = User.create_user(username, email, phone, password)
    return jsonify({"message": "User created", "user_id": str(user_id)}), 201


# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.find_user_by_email(email)

    if user and User.verify_password(user["password"], password):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid credentials"}), 401


# Logout
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"message": "Logged out successfully"}), 200


# --------------- Itinerary Routes -----------------


# @itinerary_bp.route("/recommendations", methods=["POST"])
# @jwt_required()
# def get_recommendations():
#     """
#     API endpoint to generate recommendations and create an itinerary using Groq API.
#     """
#     try:
#         # Step 1: Parse user input
#         data = request.get_json()
#         location = data.get("location")
#         budget_inr = data.get("budget")
#         food_preference = data.get("food_preference")

#         # Validate input
#         if not all([location, budget_inr, food_preference]):
#             return (
#                 jsonify(
#                     {
#                         "error": "Missing required fields: location, budget, food_preference"
#                     }
#                 ),
#                 400,
#             )

#         # Step 2: Generate recommendations using the ML model
#         top_restaurants = recommendation_model.get_recommendations(
#             location, budget_inr, food_preference
#         )

#         # Convert the DataFrame to a JSON-serializable format
#         recommendations = top_restaurants.to_dict(orient="records")

#         # Step 3: Prepare data for Groq API
#         groq_input = {
#             "location": location,
#             "budget": budget_inr,
#             "food_preference": food_preference,
#             "recommendations": recommendations,
#         }

#         # Step 4: Call the Groq API
#         headers = {
#             "Authorization": f"Bearer {GROQ_API_KEY}",
#             "Content-Type": "application/json",
#         }
#         groq_response = requests.post(GROQ_API_URL, json=groq_input, headers=headers)

#         # Validate Groq API response
#         if groq_response.status_code != 200:
#             return jsonify({"error": "Failed to fetch itinerary from Groq API"}), 500

#         itinerary = groq_response.json()  # Extract the itinerary from the Groq response

#         # Step 5: Return the itinerary and recommendations to the frontend
#         return (
#             jsonify({"itinerary": itinerary, "recommendations": recommendations}),
#             200,
#         )

#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500
