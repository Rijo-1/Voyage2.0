# import requests
# import pandas as pd
# from textblob import TextBlob
# import re
# import time
# import json
# import numpy as np


# class RecommendationModel:
#     def __init__(self, serp_api_key):
#         self.serp_api_key = serp_api_key
#         self.currency_conversion = 82.5
#         self.max_retries = 5
#         self.base_url = "https://serpapi.com/search.json"

#     def analyze_sentiment(self, review):
#         """Analyze sentiment using TextBlob."""
#         try:
#             review_text = str(review) if review is not None else ""
#             if review_text.strip():
#                 return TextBlob(review_text).sentiment.polarity
#             return 0
#         except Exception as e:
#             print(f"Error in sentiment analysis: {e}")
#             return 0

#     def extract_price(self, price_str):
#         """Extract numeric price from string."""
#         try:
#             if not price_str or price_str == "N/A":
#                 return 0
#             matches = re.findall(r"\d+(?:\.\d+)?", str(price_str))
#             return float(matches[0]) if matches else 0
#         except (IndexError, ValueError) as e:
#             print(f"Error extracting price from {price_str}: {e}")
#             return 0

#     def _make_api_request(self, params):
#         """Make API request with retry logic."""
#         for attempt in range(self.max_retries):
#             try:
#                 response = requests.get(self.base_url, params=params)
#                 response.raise_for_status()
#                 data = response.json()

#                 if "local_results" not in data:
#                     print(
#                         f"No local_results found in response for query: {params.get('q', 'unknown query')}"
#                     )
#                     return []

#                 return data.get("local_results", [])
#             except requests.exceptions.HTTPError as errh:
#                 if response.status_code == 429:  # Rate limit exceeded
#                     print(
#                         f"Rate limit exceeded, retrying... ({attempt + 1}/{self.max_retries})"
#                     )
#                     time.sleep(5 * (attempt + 1))
#                 else:
#                     print(f"HTTP error occurred: {errh}")
#                     break
#             except Exception as e:
#                 print(f"Error in API request: {e}")
#                 break
#         return []

#     def fetch_restaurants(self, location, budget, food_preferences):
#         """Fetch restaurants data based on multiple food preferences."""
#         all_restaurants = []
#         budget_inr = float(budget.get("amount", 0))

#         if not isinstance(food_preferences, list):
#             food_preferences = ["veg"]

#             query = f"restaurants in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 reviews = place.get("reviews", [])
#                 review_text = " ".join([str(review) for review in reviews if review])
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 # if price_num * self.currency_conversion <= budget_inr:
#                 restaurant_data = {
#                         "name": place.get("title", "Unknown"),
#                         "cuisine_type": place.get("category", "General"),
#                         "rating": float(place.get("rating", 0)),
#                         "address": place.get("address", "No address available"),
#                         "description": place.get(
#                             "description", "No description available"
#                         ),
#                         "contact": place.get("phone", "Not available"),
#                         "opening_hours": place.get("hours", "Hours not available"),
#                         "sentiment_score": self.analyze_sentiment(review_text),
#                         "image_url": place.get("thumbnail", ""),
#                         "price": price_num,
#                         "price_level": price_str,
#                         "food_preference": "veg",
#                     }

#                 # if not any(
#                 #         rest["name"] == restaurant_data["name"]
#                 #         and rest["address"] == restaurant_data["address"]
#                 #         for rest in all_restaurants
#                 #     ):
#                 all_restaurants.append(restaurant_data)
#         print(all_restaurants)

#         return pd.DataFrame(all_restaurants)

#     def rank_top_entries(self, df, budget=None, preferences=None, num_results=5):
#         """Rank and select top entries based on preferences."""
#         if df.empty:
#             print("Warning: Empty DataFrame provided to rank_top_entries")
#             return pd.DataFrame()

#         try:
#             df_ranked = df.copy()
#             budget_inr = float(budget.get("amount", 0)) if budget else None

#             # Handle numeric columns
#             numeric_columns = {"rating": 0, "sentiment_score": 0, "price": 0}

#             for col, default in numeric_columns.items():
#                 if col in df_ranked.columns:
#                     df_ranked[col] = pd.to_numeric(
#                         df_ranked[col], errors="coerce"
#                     ).fillna(default)

#             # Apply budget filter if applicable
#             if "price" in df_ranked.columns and budget_inr is not None:
#                 df_ranked = df_ranked[
#                     df_ranked["price"] * self.currency_conversion <= budget_inr
#                 ]
#                 if df_ranked.empty:
#                     print(f"No entries found within budget of {budget_inr} INR")
#                     return pd.DataFrame()

#             # Ensure preferences is a list
#             if preferences and not isinstance(preferences, list):
#                 preferences = [preferences]

#             # Apply preference-based scoring if preferences provided
#             if preferences:
#                 for pref in preferences:
#                     if pref.get("type") in df_ranked.columns:
#                         df_ranked[f'pref_score_{pref["type"]}'] = df_ranked[
#                             pref["type"]
#                         ].apply(
#                             lambda x: (
#                                 pref.get("weight", 1)
#                                 if str(x).lower() == str(pref.get("value")).lower()
#                                 else 0
#                             )
#                         )

#             # Calculate normalized scores and overall ranking
#             score_columns = ["rating", "sentiment_score"]
#             if preferences:
#                 score_columns.extend(
#                     [col for col in df_ranked.columns if col.startswith("pref_score_")]
#                 )

#             for col in score_columns:
#                 if col in df_ranked.columns:
#                     col_range = df_ranked[col].max() - df_ranked[col].min()
#                     if col_range > 0:
#                         df_ranked[f"normalized_{col}"] = (
#                             df_ranked[col] - df_ranked[col].min()
#                         ) / col_range
#                     else:
#                         df_ranked[f"normalized_{col}"] = 0

#             # Calculate overall score
#             normalized_cols = [
#                 f"normalized_{col}"
#                 for col in score_columns
#                 if f"normalized_{col}" in df_ranked.columns
#             ]
#             if normalized_cols:
#                 df_ranked["overall_score"] = df_ranked[normalized_cols].mean(axis=1)
#                 return df_ranked.nlargest(
#                     min(num_results, len(df_ranked)), "overall_score"
#                 )
#             else:
#                 # Fallback to simple rating-based ranking
#                 if "rating" in df_ranked.columns:
#                     return df_ranked.nlargest(
#                         min(num_results, len(df_ranked)), "rating"
#                     )
#                 return df_ranked.head(min(num_results, len(df_ranked)))

#         except Exception as e:
#             print(f"Error in ranking entries: {e}")
#             return df.head(min(num_results, len(df)))

#     def fetch_landmarks(self, location):
#         """Fetch landmarks data for a given location."""
#         query = f"landmarks in {location}"
#         params = {
#             "engine": "google_maps",
#             "type": "search",
#             "q": query,
#             "api_key": self.serp_api_key,
#         }

#         results = self._make_api_request(params)
#         landmarks = []

#         for place in results:
#             landmark_data = {
#                 "name": place.get("title", "Unknown"),
#                 "category": place.get("category", "Landmark"),
#                 "rating": float(place.get("rating", 0)),
#                 "address": place.get("address", "No address available"),
#                 "description": place.get("description", "No description available"),
#                 "image_url": place.get("thumbnail", ""),
#             }
#             landmarks.append(landmark_data)

#         return pd.DataFrame(landmarks)

#     def fetch_activities(self, location, activities):
#         """Fetch activities data based on preferences."""
#         all_activities = []

#         for activity in activities:
#             query = f"{activity} activities in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 activity_data = {
#                     "name": place.get("title", "Unknown"),
#                     "category": activity,
#                     "rating": float(place.get("rating", 0)),
#                     "address": place.get("address", "No address available"),
#                     "description": place.get("description", "No description available"),
#                     "price": price_num,
#                     "price_level": price_str,
#                     "image_url": place.get("thumbnail", ""),
#                 }
#                 all_activities.append(activity_data)

#         return pd.DataFrame(all_activities)

#     def fetch_gi_products(self, location):
#         """Fetch GI products data for the location."""
#         query = f"GI products in {location}"
#         params = {
#             "engine": "google_maps",
#             "type": "search",
#             "q": query,
#             "api_key": self.serp_api_key,
#         }

#         results = self._make_api_request(params)
#         gi_products = []

#         for place in results:
#             product_data = {
#                 "name": place.get("title", "Unknown"),
#                 "category": "GI Product",
#                 "rating": float(place.get("rating", 0)),
#                 "address": place.get("address", "No address available"),
#                 "description": place.get("description", "No description available"),
#                 "image_url": place.get("thumbnail", ""),
#             }
#             gi_products.append(product_data)

#         return pd.DataFrame(gi_products)

#     def get_comprehensive_recommendations(self, request_data):
#         """Get comprehensive travel recommendations based on user preferences."""
#         try:
#             # Extract parameters from request_data
#             location = request_data.get("location", "")
#             budget = request_data.get("budget", {"amount": 0, "currency": "INR"})
#             travelers = request_data.get("travelers", {"adults": 0, "children": 0})
#             activities = request_data.get("activities", [])
#             food_preferences = request_data.get("food_preferences", [])
#             preferences = request_data.get("preferences", [])

#             # Ensure activities is a list
#             if not isinstance(activities, list):
#                 activities = [activities]
#             if not isinstance(food_preferences, list):
#                 food_preferences = [food_preferences]

#             # Calculate total number of travelers
#             num_people = int(travelers.get("adults", 0)) + int(travelers.get("children", 0))

#             # Initialize empty DataFrames
#             restaurants_df = pd.DataFrame()
#             landmarks_df = pd.DataFrame()
#             activities_df = pd.DataFrame()
#             gi_products_df = pd.DataFrame()

#             # Fetch data with error handling
#             try:
#                 restaurants_df = self.fetch_restaurants(location, budget, food_preferences)
#             except Exception as e:
#                 print(f"Error fetching restaurants: {e}")

#             try:
#                 landmarks_df = self.fetch_landmarks(location)
#             except Exception as e:
#                 print(f"Error fetching landmarks: {e}")

#             try:
#                 activities_df = self.fetch_activities(location, activities)
#             except Exception as e:
#                 print(f"Error fetching activities: {e}")

#             try:
#                 gi_products_df = self.fetch_gi_products(location)
#             except Exception as e:
#                 print(f"Error fetching GI products: {e}")

#             # Initialize recommendations dictionary
#             recommendations = {
#                 "metadata": {
#                     "location": location,
#                     "budget": budget,
#                     "travelers": travelers,
#                     "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
#                 },
#                 "recommendations": {
#                     "restaurants": [],
#                     "landmarks": [],
#                     "activities": [],
#                     "gi_products": [],
#                 },
#                 "budget_summary": {
#                     "total_budget": float(budget.get("amount", 0)),
#                     "currency": budget.get("currency", "INR"),
#                     "num_people": num_people,
#                     "avg_meal_cost": 0,
#                     "avg_activity_cost": 0,
#                 },
#             }

#             # Process each category with preferences
#             if not restaurants_df.empty:
#                 print(restaurants_df)
#                 recommendations["recommendations"]["restaurants"] = (
#                     self.rank_top_entries(restaurants_df, budget, preferences).to_dict(
#                         "records"
#                     )
#                 )
#                 avg_meal_cost = (
#                     restaurants_df["price"].mean()
#                     * self.currency_conversion
#                     * num_people
#                 )
#                 recommendations["budget_summary"]["avg_meal_cost"] = (
#                     float(avg_meal_cost) if not pd.isna(avg_meal_cost) else 0
#                 )

#             if not landmarks_df.empty:
#                 recommendations["recommendations"]["landmarks"] = self.rank_top_entries(
#                     landmarks_df, preferences=preferences
#                 ).to_dict("records")

#             if not activities_df.empty:
#                 recommendations["recommendations"]["activities"] = (
#                     self.rank_top_entries(activities_df, budget, preferences).to_dict(
#                         "records"
#                     )
#                 )
#                 activities_with_price = activities_df[activities_df["price"] > 0]
#                 if not activities_with_price.empty:
#                     avg_activity_cost = (
#                         activities_with_price["price"].mean()
#                         * self.currency_conversion
#                         * num_people
#                     )
#                     recommendations["budget_summary"]["avg_activity_cost"] = (
#                         float(avg_activity_cost)
#                         if not pd.isna(avg_activity_cost)
#                         else 0
#                     )

#             if not gi_products_df.empty:
#                 recommendations["recommendations"]["gi_products"] = (
#                     self.rank_top_entries(gi_products_df, budget, preferences).to_dict(
#                         "records"
#                     )
#                 )

#             return json.dumps(recommendations)

#         except Exception as e:
#             print(f"Error in getting comprehensive recommendations: {e}")
#             error_response = {
#                 "error": str(e),
#                 "status": "error",
#                 "message": "Failed to generate comprehensive recommendations",
#                 "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
#             }
#             return json.dumps(error_response)

# from flask import Flask, request, jsonify
# import json
# import time
# import pandas as pd
# from textblob import TextBlob
# import re
# import requests


# # Initialize Flask app
# app = Flask(__name__)

# # Define the RecommendationModel class here (the class you provided)
# class RecommendationModel:
#     def __init__(self, serp_api_key):
#         self.serp_api_key = serp_api_key
#         self.currency_conversion = 82.5
#         self.max_retries = 5
#         self.base_url = "https://serpapi.com/search.json"

#     def analyze_sentiment(self, review):
#         """Analyze sentiment using TextBlob."""
#         try:
#             review_text = str(review) if review is not None else ""
#             if review_text.strip():
#                 return TextBlob(review_text).sentiment.polarity
#             return 0
#         except Exception as e:
#             print(f"Error in sentiment analysis: {e}")
#             return 0

#     def extract_price(self, price_str):
#         """Extract numeric price from string."""
#         try:
#             if not price_str or price_str == "N/A":
#                 return 0
#             matches = re.findall(r"\d+(?:\.\d+)?", str(price_str))
#             return float(matches[0]) if matches else 0
#         except (IndexError, ValueError) as e:
#             print(f"Error extracting price from {price_str}: {e}")
#             return 0

#     def _make_api_request(self, params):
#         """Make API request with retry logic."""
#         for attempt in range(self.max_retries):
#             try:
#                 response = requests.get(self.base_url, params=params)
#                 response.raise_for_status()
#                 data = response.json()

#                 if "local_results" not in data:
#                     print(f"No local_results found in response for query: {params.get('q', 'unknown query')}")
#                     return []

#                 return data.get("local_results", [])
#             except requests.exceptions.HTTPError as errh:
#                 if response.status_code == 429:  # Rate limit exceeded
#                     print(f"Rate limit exceeded, retrying... ({attempt + 1}/{self.max_retries})")
#                     time.sleep(5 * (attempt + 1))
#                 else:
#                     print(f"HTTP error occurred: {errh}")
#                     break
#             except Exception as e:
#                 print(f"Error in API request: {e}")
#                 break
#         return []

#     def fetch_restaurants(self, location, budget, food_preferences):
#         """Fetch restaurants data based on multiple food preferences."""
#         all_restaurants = []
#         budget_inr = float(budget.get("amount", 0))

#         if not isinstance(food_preferences, list):
#             food_preferences = [food_preferences]

#         for preference in food_preferences:
#             query = f"{preference.lower()} restaurants in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 reviews = place.get("reviews", [])
#                 review_text = " ".join([str(review) for review in reviews if review])
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 restaurant_data = {
#                     "name": place.get("title", "Unknown"),
#                     "cuisine_type": place.get("category", "General"),
#                     "rating": float(place.get("rating", 0)),
#                     "address": place.get("address", "No address available"),
#                     "description": place.get("description", "No description available"),
#                     "contact": place.get("phone", "Not available"),
#                     "opening_hours": place.get("hours", "Hours not available"),
#                     "sentiment_score": self.analyze_sentiment(review_text),
#                     "image_url": place.get("thumbnail", ""),
#                     "price": price_num,
#                     "price_level": price_str,
#                     "food_preference": preference,
#                 }

#                 if not any(
#                     rest["name"] == restaurant_data["name"]
#                     and rest["address"] == restaurant_data["address"]
#                     for rest in all_restaurants
#                 ):
#                     all_restaurants.append(restaurant_data)

#         return pd.DataFrame(all_restaurants)

#     def rank_top_entries(self, df, budget=None, preferences=None, num_results=5):
#         """Rank and select top entries based on preferences."""
#         if df.empty:
#             print("Warning: Empty DataFrame provided to rank_top_entries")
#             return pd.DataFrame()

#         df_ranked = df.copy()

#         # Apply budget filter if applicable
#         budget_inr = float(budget.get("amount", 0)) if budget else None
#         if "price" in df_ranked.columns and budget_inr is not None:
#             df_ranked = df_ranked[df_ranked["price"] * self.currency_conversion <= budget_inr]

#         # Rank by rating
#         if "rating" in df_ranked.columns:
#             return df_ranked.nlargest(min(num_results, len(df_ranked)), "rating")
#         return df_ranked.head(min(num_results, len(df_ranked)))

#     def get_comprehensive_recommendations(self, request_data):
#         """Get comprehensive travel recommendations based on user preferences."""
#         try:
#             # Extract parameters from request_data
#             location = request_data.get("location", "")
#             budget = request_data.get("budget", {"amount": 0, "currency": "INR"})
#             travelers = request_data.get("travelers", {"adults": 0, "children": 0})
#             activities = request_data.get("activities", [])
#             preferences = request_data.get("preferences", [])

#             num_people = int(travelers.get("adults", 0)) + int(travelers.get("children", 0))

#             # Initialize empty DataFrames
#             restaurants_df = pd.DataFrame()
#             activities_df = pd.DataFrame()

#             # Fetch data with error handling
#             restaurants_df = self.fetch_restaurants(location, budget, preferences)
#             activities_df = self.fetch_activities(location, activities)

#             recommendations = {
#                 "metadata": {
#                     "location": location,
#                     "budget": budget,
#                     "travelers": travelers,
#                     "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
#                 },
#                 "recommendations": {
#                     "restaurants": [],
#                     "activities": [],
#                 },
#                 "budget_summary": {
#                     "total_budget": float(budget.get("amount", 0)),
#                     "currency": budget.get("currency", "INR"),
#                     "num_people": num_people,
#                     "avg_meal_cost": 0,
#                     "avg_activity_cost": 0,
#                 },
#             }

#             if not restaurants_df.empty:
#                 recommendations["recommendations"]["restaurants"] = (
#                     self.rank_top_entries(restaurants_df, budget).to_dict("records")
#                 )
#                 avg_meal_cost = restaurants_df["price"].mean() * self.currency_conversion * num_people
#                 recommendations["budget_summary"]["avg_meal_cost"] = float(avg_meal_cost)

#             if not activities_df.empty:
#                 recommendations["recommendations"]["activities"] = (
#                     self.rank_top_entries(activities_df, budget).to_dict("records")
#                 )
#                 avg_activity_cost = activities_df["price"].mean() * self.currency_conversion * num_people
#                 recommendations["budget_summary"]["avg_activity_cost"] = float(avg_activity_cost)

#             return json.dumps(recommendations)

#         except Exception as e:
#             print(f"Error in getting comprehensive recommendations: {e}")
#             return json.dumps({"error": str(e)})


#     def fetch_activities(self, location, activities):
#         """Fetch activities data based on preferences."""
#         all_activities = []
#         for activity in activities:
#             query = f"{activity} activities in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 activity_data = {
#                     "name": place.get("title", "Unknown"),
#                     "category": activity,
#                     "rating": float(place.get("rating", 0)),
#                     "address": place.get("address", "No address available"),
#                     "description": place.get("description", "No description available"),
#                     "price": price_num,
#                     "price_level": price_str,
#                     "image_url": place.get("thumbnail", ""),
#                 }
#                 all_activities.append(activity_data)

#         return pd.DataFrame(all_activities)


# # Initialize your RecommendationModel with a dummy API key (replace with your actual API key)
# serp_api_key = "YOUR_SERP_API_KEY"
# recommendation_model = RecommendationModel(serp_api_key)


# # Define the route for recommendations
# @app.route('/recommendations', methods=['POST'])
# def get_recommendations():
#     try:
#         request_data = request.get_json()  # Get JSON data from the request

#         # Ensure 'budget' is part of the request data
#         if not request_data.get('budget'):
#             return jsonify({"error": "Missing 'budget' field in request data"}), 400

#         # Get the recommendations using the model
#         result = recommendation_model.get_comprehensive_recommendations(request_data)

#         return jsonify(json.loads(result))  # Return the recommendations as a JSON response

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)

#######################################################################
# from flask import Flask, request, jsonify
# import json
# import time
# import pandas as pd
# from textblob import TextBlob
# import re
# import requests


# # Initialize Flask app
# app = Flask(__name__)


# # Define the RecommendationModel class
# class RecommendationModel:
#     def __init__(self, serp_api_key):
#         self.serp_api_key = serp_api_key
#         self.currency_conversion = 82.5
#         self.max_retries = 5
#         self.base_url = "https://serpapi.com/search.json"

#     def analyze_sentiment(self, review):
#         """Analyze sentiment using TextBlob."""
#         try:
#             review_text = str(review) if review is not None else ""
#             if review_text.strip():
#                 return TextBlob(review_text).sentiment.polarity
#             return 0
#         except Exception as e:
#             print(f"Error in sentiment analysis: {e}")
#             return 0

#     def extract_price(self, price_str):
#         """Extract numeric price from string."""
#         try:
#             if not price_str or price_str == "N/A":
#                 return 0
#             matches = re.findall(r"\d+(?:\.\d+)?", str(price_str))
#             return float(matches[0]) if matches else 0
#         except (IndexError, ValueError) as e:
#             print(f"Error extracting price from {price_str}: {e}")
#             return 0

#     def _make_api_request(self, params):
#         """Make API request with retry logic."""
#         for attempt in range(self.max_retries):
#             try:
#                 response = requests.get(self.base_url, params=params)
#                 response.raise_for_status()
#                 data = response.json()

#                 if "local_results" not in data:
#                     print(
#                         f"No local_results found in response for query: {params.get('q', 'unknown query')}"
#                     )
#                     return []

#                 return data.get("local_results", [])
#             except requests.exceptions.HTTPError as errh:
#                 if response.status_code == 429:  # Rate limit exceeded
#                     print(
#                         f"Rate limit exceeded, retrying... ({attempt + 1}/{self.max_retries})"
#                     )
#                     time.sleep(5 * (attempt + 1))
#                 else:
#                     print(f"HTTP error occurred: {errh}")
#                     break
#             except Exception as e:
#                 print(f"Error in API request: {e}")
#                 break
#         return []

#     def fetch_restaurants(self, location, budget, food_preferences):
#         """Fetch restaurants data based on multiple food preferences."""
#         all_restaurants = []
#         budget_inr = float(budget.get("amount", 0))

#         if not isinstance(food_preferences, list):
#             food_preferences = [food_preferences]

#         for preference in food_preferences:
#             query = f"{preference.lower()} restaurants in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 reviews = place.get("reviews", [])
#                 review_text = " ".join([str(review) for review in reviews if review])
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 restaurant_data = {
#                     "name": place.get("title", "Unknown"),
#                     "cuisine_type": place.get("category", "General"),
#                     "rating": float(place.get("rating", 0)),
#                     "address": place.get("address", "No address available"),
#                     "description": place.get("description", "No description available"),
#                     "contact": place.get("phone", "Not available"),
#                     "opening_hours": place.get("hours", "Hours not available"),
#                     "sentiment_score": self.analyze_sentiment(review_text),
#                     "image_url": place.get("thumbnail", ""),
#                     "price": price_num,
#                     "price_level": price_str,
#                     "food_preference": preference,
#                 }

#                 if not any(
#                     rest["name"] == restaurant_data["name"]
#                     and rest["address"] == restaurant_data["address"]
#                     for rest in all_restaurants
#                 ):
#                     all_restaurants.append(restaurant_data)

#         return pd.DataFrame(all_restaurants)

#     def fetch_hotels(self, location):
#         """Fetch hotels (places to stay) data based on location."""
#         all_hotels = []
#         query = f"places to stay in {location}"
#         params = {
#             "engine": "google_maps",
#             "type": "search",
#             "q": query,
#             "api_key": self.serp_api_key,
#         }

#         results = self._make_api_request(params)
#         for place in results:
#             price_str = place.get("price", "N/A")
#             price_num = self.extract_price(price_str)

#             hotel_data = {
#                 "name": place.get("title", "Unknown"),
#                 "category": "Hotel",
#                 "rating": float(place.get("rating", 0)),
#                 "address": place.get("address", "No address available"),
#                 "description": place.get("description", "No description available"),
#                 "price": price_num,
#                 "price_level": price_str,
#                 "image_url": place.get("thumbnail", ""),
#             }
#             all_hotels.append(hotel_data)

#         return pd.DataFrame(all_hotels)

#     def rank_top_entries(self, df, budget=None, preferences=None, num_results=5):
#         """Rank and select top entries based on preferences."""
#         if df.empty:
#             print("Warning: Empty DataFrame provided to rank_top_entries")
#             return pd.DataFrame()

#         df_ranked = df.copy()

#         # Apply budget filter if applicable
#         budget_inr = float(budget.get("amount", 0)) if budget else None
#         if "price" in df_ranked.columns and budget_inr is not None:
#             df_ranked = df_ranked[
#                 df_ranked["price"] * self.currency_conversion <= budget_inr
#             ]

#         # Rank by rating
#         if "rating" in df_ranked.columns:
#             return df_ranked.nlargest(min(num_results, len(df_ranked)), "rating")
#         return df_ranked.head(min(num_results, len(df_ranked)))

#     def get_comprehensive_recommendations(self, request_data):
#         """Get comprehensive travel recommendations based on user preferences."""
#         try:
#             # Extract parameters from request_data
#             location = request_data.get("location", "")
#             budget = request_data.get("budget", {"amount": 0, "currency": "INR"})
#             travelers = request_data.get("travelers", {"adults": 0, "children": 0})
#             activities = request_data.get("activities", [])
#             preferences = request_data.get("preferences", [])

#             num_people = int(travelers.get("adults", 0)) + int(
#                 travelers.get("children", 0)
#             )

#             # Initialize empty DataFrames
#             restaurants_df = pd.DataFrame()
#             activities_df = pd.DataFrame()
#             hotels_df = pd.DataFrame()

#             # Fetch data with error handling
#             restaurants_df = self.fetch_restaurants(location, budget, preferences)
#             activities_df = self.fetch_activities(location, activities)
#             hotels_df = self.fetch_hotels(location)

#             recommendations = {
#                 "metadata": {
#                     "location": location,
#                     "budget": budget,
#                     "travelers": travelers,
#                     "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
#                 },
#                 "recommendations": {
#                     "restaurants": [],
#                     "activities": [],
#                     "places_to_stay": [],
#                 },
#                 "budget_summary": {
#                     "total_budget": float(budget.get("amount", 0)),
#                     "currency": budget.get("currency", "INR"),
#                     "num_people": num_people,
#                     "avg_meal_cost": 0,
#                     "avg_activity_cost": 0,
#                     "avg_hotel_cost": 0,
#                 },
#             }

#             if not restaurants_df.empty:
#                 recommendations["recommendations"]["restaurants"] = (
#                     self.rank_top_entries(restaurants_df, budget).to_dict("records")
#                 )
#                 avg_meal_cost = (
#                     restaurants_df["price"].mean()
#                     * self.currency_conversion
#                     * num_people
#                 )
#                 recommendations["budget_summary"]["avg_meal_cost"] = float(
#                     avg_meal_cost
#                 )

#             if not activities_df.empty:
#                 recommendations["recommendations"]["activities"] = (
#                     self.rank_top_entries(activities_df, budget).to_dict("records")
#                 )
#                 avg_activity_cost = (
#                     activities_df["price"].mean()
#                     * self.currency_conversion
#                     * num_people
#                 )
#                 recommendations["budget_summary"]["avg_activity_cost"] = float(
#                     avg_activity_cost
#                 )

#             if not hotels_df.empty:
#                 recommendations["recommendations"]["places_to_stay"] = (
#                     self.rank_top_entries(hotels_df, budget).to_dict("records")
#                 )
#                 avg_hotel_cost = (
#                     hotels_df["price"].mean() * self.currency_conversion * num_people
#                 )
#                 recommendations["budget_summary"]["avg_hotel_cost"] = float(
#                     avg_hotel_cost
#                 )

#             return json.dumps(recommendations)

#         except Exception as e:
#             print(f"Error in getting comprehensive recommendations: {e}")
#             return json.dumps({"error": str(e)})

#     def fetch_activities(self, location, activities):
#         """Fetch activities data based on preferences."""
#         all_activities = []
#         for activity in activities:
#             query = f"{activity} activities in {location}"
#             params = {
#                 "engine": "google_maps",
#                 "type": "search",
#                 "q": query,
#                 "api_key": self.serp_api_key,
#             }

#             results = self._make_api_request(params)
#             for place in results:
#                 price_str = place.get("price", "N/A")
#                 price_num = self.extract_price(price_str)

#                 activity_data = {
#                     "name": place.get("title", "Unknown"),
#                     "category": activity,
#                     "rating": float(place.get("rating", 0)),
#                     "address": place.get("address", "No address available"),
#                     "description": place.get("description", "No description available"),
#                     "price": price_num,
#                     "price_level": price_str,
#                     "image_url": place.get("thumbnail", ""),
#                 }
#                 all_activities.append(activity_data)

#         return pd.DataFrame(all_activities)


# # Initialize your RecommendationModel with a dummy API key (replace with your actual API key)
# serp_api_key = "71d4efe94f1305f8e0da34f1a7df1651560c57d021b796f33509844b9680a210"
# recommendation_model = RecommendationModel(serp_api_key)


# # Define the route for recommendations
# @app.route("/recommendations", methods=["POST"])
# def get_recommendations():
#     try:
#         request_data = request.get_json()  # Get JSON data from the request

#         # Ensure 'budget' is part of the request data
#         if not request_data.get("budget"):
#             return jsonify({"error": "Missing 'budget' field in request data"}), 400

#         # Get the recommendations using the model
#         result = recommendation_model.get_comprehensive_recommendations(request_data)

#         return jsonify(
#             json.loads(result)
#         )  # Return the recommendations as a JSON response

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)







from flask import Flask, request, jsonify
import json
import time
import pandas as pd
from textblob import TextBlob
import re
import requests

# Initialize Flask app
app = Flask(__name__)

# Define the RecommendationModel class
class RecommendationModel:
    def __init__(self, serp_api_key):
        self.serp_api_key = serp_api_key
        self.currency_conversion = 82.5
        self.max_retries = 5
        self.base_url = "https://serpapi.com/search.json"

    def analyze_sentiment(self, review):
        """Analyze sentiment using TextBlob."""
        try:
            review_text = str(review) if review is not None else ""
            if review_text.strip():
                return TextBlob(review_text).sentiment.polarity
            return 0
        except Exception as e:
            print(f"Error in sentiment analysis: {e}")
            return 0

    def extract_price(self, price_str):
        """Extract numeric price from string."""
        try:
            if not price_str or price_str == "N/A":
                return 0
            matches = re.findall(r"\d+(?:\.\d+)?", str(price_str))
            return float(matches[0]) if matches else 0
        except (IndexError, ValueError) as e:
            print(f"Error extracting price from {price_str}: {e}")
            return 0

    def _make_api_request(self, params):
        """Make API request with retry logic."""
        for attempt in range(self.max_retries):
            try:
                response = requests.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                if "local_results" not in data:
                    print(
                        f"No local_results found in response for query: {params.get('q', 'unknown query')}"
                    )
                    return []

                return data.get("local_results", [])
            except requests.exceptions.HTTPError as errh:
                if response.status_code == 429:  # Rate limit exceeded
                    print(
                        f"Rate limit exceeded, retrying... ({attempt + 1}/{self.max_retries})"
                    )
                    time.sleep(5 * (attempt + 1))
                else:
                    print(f"HTTP error occurred: {errh}")
                    break
            except Exception as e:
                print(f"Error in API request: {e}")
                break
        return []

    def fetch_restaurants(self, location, budget, food_preferences):
        """Fetch restaurants data based on multiple food preferences."""
        all_restaurants = []
        budget_inr = float(budget.get("amount", 0))

        if not isinstance(food_preferences, list):
            food_preferences = [food_preferences]

        for preference in food_preferences:
            query = f"{preference.lower()} restaurants in {location}"
            params = {
                "engine": "google_maps",
                "type": "search",
                "q": query,
                "api_key": self.serp_api_key,
            }

            results = self._make_api_request(params)
            for place in results:
                reviews = place.get("reviews", [])
                review_text = " ".join([str(review) for review in reviews if review])
                price_str = place.get("price", "N/A")
                price_num = self.extract_price(price_str)

                restaurant_data = {
                    "name": place.get("title", "Unknown"),
                    "cuisine_type": place.get("category", "General"),
                    "rating": float(place.get("rating", 0)),
                    "address": place.get("address", "No address available"),
                    "description": place.get("description", "No description available"),
                    "contact": place.get("phone", "Not available"),
                    "opening_hours": place.get("hours", "Hours not available"),
                    "sentiment_score": self.analyze_sentiment(review_text),
                    "image_url": place.get("thumbnail", ""),
                    "price": price_num,
                    "price_level": price_str,
                    "food_preference": preference,
                }

                if not any(
                    rest["name"] == restaurant_data["name"]
                    and rest["address"] == restaurant_data["address"]
                    for rest in all_restaurants
                ):
                    all_restaurants.append(restaurant_data)

        return pd.DataFrame(all_restaurants)

    def fetch_hotels(self, location):
        """Fetch hotels (places to stay) data based on location."""
        all_hotels = []
        query = f"places to stay in {location}"
        params = {
            "engine": "google_maps",
            "type": "search",
            "q": query,
            "api_key": self.serp_api_key,
        }

        results = self._make_api_request(params)
        for place in results:
            price_str = place.get("price", "N/A")
            price_num = self.extract_price(price_str)

            hotel_data = {
                "name": place.get("title", "Unknown"),
                "category": "Hotel",
                "rating": float(place.get("rating", 0)),
                "address": place.get("address", "No address available"),
                "description": place.get("description", "No description available"),
                "price": price_num,
                "price_level": price_str,
                "image_url": place.get("thumbnail", ""),
            }
            all_hotels.append(hotel_data)

        return pd.DataFrame(all_hotels)

    def fetch_activities(self, location, activity_preferences):
        """Fetch activities based on location and user preferences."""
        all_activities = []
        for activity in activity_preferences:
            query = f"{activity} activities in {location}"
            params = {
                "engine": "google_maps",
                "type": "search",
                "q": query,
                "api_key": self.serp_api_key,
            }

            results = self._make_api_request(params)
            for place in results:
                activity_data = {
                    "name": place.get("title", "Unknown"),
                    "category": activity,
                    "rating": float(place.get("rating", 0)),
                    "address": place.get("address", "No address available"),
                    "description": place.get("description", "No description available"),
                    "price": self.extract_price(place.get("price", "N/A")),
                    "image_url": place.get("thumbnail", ""),
                }
                all_activities.append(activity_data)

        return pd.DataFrame(all_activities)

    def fetch_handmade_materials(self, category="handmade"):
        """Fetch top handmade materials based on the category."""
        all_materials = []
        query = f"top {category} handmade materials"
        params = {
            "engine": "google_shopping",
            "q": query,
            "api_key": self.serp_api_key,
        }

        results = self._make_api_request(params)
        for material in results:
            price_str = material.get("price", "N/A")
            price_num = self.extract_price(price_str)

            material_data = {
                "name": material.get("title", "Unknown"),
                "category": category,
                "rating": float(material.get("rating", 0)),
                "description": material.get("description", "No description available"),
                "price": price_num,
                "price_level": price_str,
                "image_url": material.get("thumbnail", ""),
            }
            all_materials.append(material_data)

        return pd.DataFrame(all_materials)

    def rank_top_entries(self, df, budget=None, preferences=None, num_results=5):
        """Rank and select top entries based on preferences."""
        if df.empty:
            print("Warning: Empty DataFrame provided to rank_top_entries")
            return pd.DataFrame()

        df_ranked = df.copy()

        # Apply budget filter if applicable
        budget_inr = float(budget.get("amount", 0)) if budget else None
        if "price" in df_ranked.columns and budget_inr is not None:
            df_ranked = df_ranked[
                df_ranked["price"] * self.currency_conversion <= budget_inr
            ]

        # Rank by rating
        if "rating" in df_ranked.columns:
            return df_ranked.nlargest(min(num_results, len(df_ranked)), "rating")
        return df_ranked.head(min(num_results, len(df_ranked)))

    def get_comprehensive_recommendations(self, request_data):
        """Get comprehensive travel recommendations based on user preferences."""
        try:
            # Extract parameters from request_data
            location = request_data.get("location", "")
            budget = request_data.get("budget", {"amount": 0, "currency": "INR"})
            travelers = request_data.get("travelers", {"adults": 0, "children": 0})
            activities = request_data.get("activities", [])
            preferences = request_data.get("preferences", [])
            handmade_category = request_data.get("handmade_category", "materials")  # Get handmade category

            num_people = int(travelers.get("adults", 0)) + int(
                travelers.get("children", 0)
            )

            # Initialize empty DataFrames for each category
            restaurants_df = pd.DataFrame()
            activities_df = pd.DataFrame()
            hotels_df = pd.DataFrame()
            handmade_materials_df = pd.DataFrame()

            # Fetch data for each category
            if location:
                if preferences:
                    restaurants_df = self.fetch_restaurants(
                        location, budget, preferences
                    )
                if activities:
                    activities_df = self.fetch_activities(location, activities)
                hotels_df = self.fetch_hotels(location)
                handmade_materials_df = self.fetch_handmade_materials(handmade_category)

            recommendations = {
                "metadata": {
                    "location": location,
                    "budget": budget,
                    "travelers": travelers,
                    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                },
                "recommendations": {},
                "budget_summary": {
                    "total_budget": budget["amount"],
                    "currency": budget["currency"],
                    "num_people": num_people,
                },
            }

            # Add restaurant, activity, hotel, and handmade material recommendations
            if not restaurants_df.empty:
                recommendations["recommendations"]["restaurants"] = (
                    self.rank_top_entries(restaurants_df, budget).to_dict("records")
                )
                avg_meal_cost = (
                    restaurants_df["price"].mean()
                    * self.currency_conversion
                    * num_people
                )
                recommendations["budget_summary"]["avg_meal_cost"] = float(
                    avg_meal_cost
                )

            if not activities_df.empty:
                recommendations["recommendations"]["activities"] = (
                    self.rank_top_entries(activities_df, budget).to_dict("records")
                )
                avg_activity_cost = (
                    activities_df["price"].mean()
                    * self.currency_conversion
                    * num_people
                )
                recommendations["budget_summary"]["avg_activity_cost"] = float(
                    avg_activity_cost
                )

            if not hotels_df.empty:
                recommendations["recommendations"]["places_to_stay"] = (
                    self.rank_top_entries(hotels_df, budget).to_dict("records")
                )
                avg_hotel_cost = (
                    hotels_df["price"].mean() * self.currency_conversion * num_people
                )
                recommendations["budget_summary"]["avg_hotel_cost"] = float(
                    avg_hotel_cost
                )

            if not handmade_materials_df.empty:
                recommendations["recommendations"]["top_handmade_materials"] = (
                    self.rank_top_entries(handmade_materials_df, budget).to_dict("records")
                )
                avg_handmade_materials_cost = (
                    handmade_materials_df["price"].mean()
                    * self.currency_conversion
                    * num_people
                )
                recommendations["budget_summary"]["avg_handmade_materials_cost"] = float(
                    avg_handmade_materials_cost
                )

            return json.dumps(recommendations)

        except Exception as e:
            print(f"Error in getting comprehensive recommendations: {e}")
            return json.dumps({"error": str(e)})

# Initialize the recommendation model
serp_api_key = "your_serp_api_key"  # Replace with your actual API key
recommendation_model = RecommendationModel(serp_api_key)

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    request_data = request.get_json()
    recommendations = recommendation_model.get_comprehensive_recommendations(request_data)
    return jsonify(json.loads(recommendations))

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

