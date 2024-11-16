from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import json
from itinerary.models import RecommendationModel

itinerary_bp = Blueprint("itinerary", __name__)

SERP_API_KEY = "71d4efe94f1305f8e0da34f1a7df1651560c57d021b796f33509844b9680a210"  # Your SerpAPI key

def get_recommendation_model():
    """Instantiate the recommendation model without pickling."""
    try:
        # Return a new instance of the recommendation model
        return RecommendationModel(SERP_API_KEY)
    except Exception as e:
        print(f"Error creating recommendation model: {str(e)}")
        return None

@itinerary_bp.route("/recommendations", methods=["POST"])
@jwt_required()
def get_recommendations():
    """API endpoint to generate comprehensive recommendations based on user preferences."""
    recommendation_model = get_recommendation_model()

    if recommendation_model is None:
        return jsonify({"error": "Recommendation model not created."}), 500

    try:
        data = request.get_json()

        print("Incoming data:", data)

        location = data.get("location")
        budget_inr = float(data.get("budget", {}).get("amount", 0))
        food_preference = data.get("food_preference", "veg")
        num_people = int(data.get("num_people", 1))
        activities = data.get("activities", [])

        if not location or not budget_inr:
            return (
                jsonify({"error": "Missing required fields: location and budget_inr"}),
                400,
            )

        try:
            # Generate the recommendations using the model
            recommendations = recommendation_model.get_comprehensive_recommendations(
                {
                    "location": location,
                    "budget": {
                        "amount": budget_inr,
                        "currency": "INR",
                    },
                    "travelers": {
                        "adults": num_people,
                        "children": 0,
                    },
                    "activities": activities,
                    "food_preferences": [food_preference],
                    "preferences": [],
                }
            )

            # Parse the recommendations
            if isinstance(recommendations, str):
                recommendations_dict = json.loads(recommendations)
            else:
                recommendations_dict = recommendations

            return jsonify(recommendations_dict), 200

        except Exception as e:
            return jsonify({"error": f"Error in recommendation model: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
