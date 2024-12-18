from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from flask_cors import CORS
from config import Config
from auth.routes import auth_bp
from itinerary.routes import itinerary_bp  
import pickle
from itinerary.models import RecommendationModel

app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)
jwt = JWTManager(app)

CORS(app)  

app.mongo = mongo

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(itinerary_bp, url_prefix="/itinerary")


# def unpickle_model(file_path, serp_api_key):
#     """
#     Unpickles the recommendation model and assigns the serp_api_key dynamically.
#     """
#     with open(file_path, "rb") as f:
#         model = pickle.load(f)
#     model.serp_api_key = serp_api_key  
#     return model


# @app.route("/get_recommendations", methods=["POST"])
# def get_recommendations():
#     """
#     Get restaurant recommendations based on user input (location, budget, food preference).
#     """
#     data = request.get_json()

#     location = data.get("location", "")
#     budget_inr = data.get("budget_inr", 0)
#     food_preference = data.get(
#         "food_preference", "veg"
#     )  

#     serp_api_key = "your_serp_api_key"  # You can also load this from a secure config or environment variable

#     # Unpickle the model
#     model = unpickle_model("recommendation_model.pkl", serp_api_key)

#     # Get recommendations from the model
#     top_restaurants = model.get_recommendations(location, budget_inr, food_preference)

#     # Convert the dataframe to a list of dictionaries for the response
#     recommendations = top_restaurants.to_dict(orient="records")

#     return jsonify(recommendations)


if __name__ == "__main__":
    app.run(debug=True)
