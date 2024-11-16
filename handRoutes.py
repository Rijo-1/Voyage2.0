from flask import Flask, request, jsonify
import requests
import re
import time

# Initialize Flask app
app = Flask(__name__)


# Define the RecommendationModel2 class
class RecommendationModel2:
    def __init__(self, serp_api_key):
        self.serp_api_key = serp_api_key
        self.max_retries = 5
        self.base_url = "https://serpapi.com/search.json"

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

    def fetch_handmade_materials(self, location=""):
        """Fetch top handmade materials based on location."""
        all_materials = []
        query = f"handmade materials in {location}"
        params = {
            "engine": "google_maps",  # Using Google Maps engine
            "type": "search",
            "q": query,
            "api_key": self.serp_api_key,
        }

        # Make API request
        results = self._make_api_request(params)
        for material in results:
            price_str = material.get("price", "N/A")
            price_num = self.extract_price(price_str)

            # Extract address, if available
            address = material.get("address", "No address available")

            material_data = {
                "name": material.get("title", "Unknown"),
                "category": "handmade",  # Static value for handmade items
                "rating": float(material.get("rating", 0)),
                "description": material.get("description", "No description available"),
                "price": price_num,
                "price_level": price_str,
                "image_url": material.get("thumbnail", ""),
                "address": address,  # Adding address to the response
            }
            all_materials.append(material_data)

        return all_materials

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


# Initialize the recommendation model
serp_api_key = "d9def8cf762be1e0fec1fa044c7e0186ebdb31ee32eebe0ba03cc3c649459ae0"  # Replace with your actual API key for SerpAPI
recommendation_model = RecommendationModel2(serp_api_key)


@app.route("/handmade_materials", methods=["POST"])
def get_handmade_materials():
    try:
        # Get JSON data from the frontend request
        request_data = request.get_json()

        # Extract location parameter
        location = request_data.get("location", "")

        # Validate location parameter (mandatory)
        if not location:
            return jsonify({"error": "Location is required"}), 400

        # Fetch handmade materials based on location
        materials = recommendation_model.fetch_handmade_materials(location)

        # Prepare the response with location and materials
        response_data = {"location": location, "materials": materials}

        return jsonify(response_data)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
