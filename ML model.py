import requests
import pandas as pd
from textblob import TextBlob
import re


SERP_API_KEY = 'API_KEY'

def analyze_sentiment(review):
    try:
        review_text = str(review) if review is not None else ""
        if review_text.strip():
            blob = TextBlob(review_text)
            return blob.sentiment.polarity
        return 0
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return 0

def extract_price(price_str):
    try:
        price_num = float(re.findall(r'\d+(?:\.\d+)?', price_str)[0])
        return price_num
    except (IndexError, ValueError):
        return 0

def fetch_gi_products(location):
    url = "https://serpapi.com/search.json"
    queries = [
        f"handicraft shops in {location}",
        f"artisan markets in {location}",
        f"local craft stores in {location}",
        f"traditional market in {location}",
        f"souvenir shops in {location}"
    ]
    
    all_products = []
    
    try:
        for query in queries:
            params = {
                "engine": "google_maps",
                "type": "search",
                "q": query,
                "api_key": SERP_API_KEY
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            for place in data.get('local_results', []):
                reviews = place.get('reviews', [])
                review_text = " ".join([str(review) for review in reviews if review]) if isinstance(reviews, list) else str(reviews) if reviews else ""
                
                description = place.get('description', '')
                category = place.get('category', '')
                
                product_data = {
                    "name": place.get('title', 'Unknown'),
                    "shop_type": category,
                    "description": description or "Traditional local products available",
                    "rating": float(place.get('rating', 0)),
                    "address": place.get('address', 'No address available'),
                    "contact": place.get('phone', 'Not available'),
                    "opening_hours": place.get('hours', 'Hours not available'),
                    "sentiment_score": analyze_sentiment(review_text),
                    "image_url": place.get('thumbnail', ''),
                    "price_level": place.get('price', 'N/A'),
                    "products_type": "Traditional/Local"
                }
                
                if not any(prod['name'] == product_data['name'] and 
                          prod['address'] == product_data['address'] 
                          for prod in all_products):
                    all_products.append(product_data)
            
        return pd.DataFrame(all_products)
    except Exception as e:
        print(f"Error fetching GI products: {e}")
        return pd.DataFrame()

def fetch_landmarks(location):
    url = "https://serpapi.com/search.json"
    queries = [
        f"historical landmarks in {location}",
        f"monuments in {location}",
        f"tourist attractions in {location}",
        f"heritage sites in {location}",
        f"museums in {location}"
    ]
    
    all_landmarks = []
    
    try:
        for query in queries:
            params = {
                "engine": "google_maps",
                "type": "search",
                "q": query,
                "api_key": SERP_API_KEY
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            for place in data.get('local_results', []):
                reviews = place.get('reviews', [])
                review_text = " ".join([str(review) for review in reviews if review]) if isinstance(reviews, list) else str(reviews) if reviews else ""
                rating = float(place.get('rating', 0))
                
                landmark_data = {
                    "name": place.get('title', 'Unknown'),
                    "category": place.get('category', 'General'),
                    "rating": rating,
                    "address": place.get('address', 'No address available'),
                    "description": place.get('description', 'No description available'),
                    "contact": place.get('phone', 'Not available'),
                    "opening_hours": place.get('hours', 'Hours not available'),
                    "sentiment_score": analyze_sentiment(review_text),
                    "image_url": place.get('thumbnail', ''),
                    "type": "Popular" if rating >= 4.5 else "Hidden Gem",
                    "visitor_status": place.get('status', 'Status not available')
                }
                
                if not any(lm['name'] == landmark_data['name'] and 
                          lm['address'] == landmark_data['address'] 
                          for lm in all_landmarks):
                    all_landmarks.append(landmark_data)
            
        return pd.DataFrame(all_landmarks)
    except Exception as e:
        print(f"Error fetching landmarks: {e}")
        return pd.DataFrame()

def fetch_activities(location, activity_types=None):
    url = "https://serpapi.com/search.json"
    
    activity_categories = {
        "adventure": [
            f"adventure activities in {location}",
            f"outdoor sports in {location}",
            f"trekking in {location}"
        ],
        "cultural": [
            f"cultural activities in {location}",
            f"art galleries in {location}",
            f"cultural workshops in {location}"
        ],
        "entertainment": [
            f"entertainment venues in {location}",
            f"theatres in {location}",
            f"amusement parks in {location}"
        ],
        "nature": [
            f"nature activities in {location}",
            f"parks in {location}",
            f"gardens in {location}"
        ],
        "wellness": [
            f"spa and wellness in {location}",
            f"yoga centers in {location}",
            f"fitness activities in {location}"
        ]
    }
    
    all_activities = []
    
    try:
        if activity_types:
            selected_categories = {k: v for k, v in activity_categories.items() 
                                 if any(act_type.lower() in k.lower() 
                                       for act_type in activity_types)}
        else:
            selected_categories = activity_categories
            
        for category, queries in selected_categories.items():
            for query in queries:
                params = {
                    "engine": "google_maps",
                    "type": "search",
                    "q": query,
                    "api_key": SERP_API_KEY
                }
                
                response = requests.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                
                for place in data.get('local_results', []):
                    reviews = place.get('reviews', [])
                    review_text = " ".join([str(review) for review in reviews if review]) if isinstance(reviews, list) else str(reviews) if reviews else ""
                    price_str = place.get('price', 'N/A')
                    
                    activity_data = {
                        "name": place.get('title', 'Unknown'),
                        "category": category,
                        "subcategory": place.get('category', 'General'),
                        "rating": float(place.get('rating', 0)),
                        "address": place.get('address', 'No address available'),
                        "description": place.get('description', 'No description available'),
                        "contact": place.get('phone', 'Not available'),
                        "opening_hours": place.get('hours', 'Hours not available'),
                        "sentiment_score": analyze_sentiment(review_text),
                        "image_url": place.get('thumbnail', ''),
                        "price": extract_price(price_str),
                        "price_level": price_str,
                        "status": place.get('status', 'Status not available')
                    }
                    
                    if not any(act['name'] == activity_data['name'] and 
                              act['address'] == activity_data['address'] 
                              for act in all_activities):
                        all_activities.append(activity_data)
            
        return pd.DataFrame(all_activities)
    except Exception as e:
        print(f"Error fetching activities: {e}")
        return pd.DataFrame()

def fetch_restaurants(location, budget_inr, food_preference):
    url = "https://serpapi.com/search.json"
    queries = []
    
    if food_preference.lower() == "veg":
        queries = [
            f"vegetarian restaurants in {location}",
            f"pure veg restaurants in {location}",
            f"vegan restaurants in {location}"
        ]
    else:
        queries = [
            f"restaurants in {location}",
            f"non-vegetarian restaurants in {location}",
            f"best dining places in {location}"
        ]
    
    all_restaurants = []
    
    try:
        for query in queries:
            params = {
                "engine": "google_maps",
                "type": "search",
                "q": query,
                "api_key": SERP_API_KEY
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            for place in data.get('local_results', []):
                reviews = place.get('reviews', [])
                review_text = " ".join([str(review) for review in reviews if review]) if isinstance(reviews, list) else str(reviews) if reviews else ""
                price_str = place.get('price', 'N/A')
                price_num = extract_price(price_str)
                
                if price_num * 82.5 <= budget_inr:
                    restaurant_data = {
                        "name": place.get('title', 'Unknown'),
                        "cuisine_type": place.get('category', 'General'),
                        "rating": float(place.get('rating', 0)),
                        "address": place.get('address', 'No address available'),
                        "description": place.get('description', 'No description available'),
                        "contact": place.get('phone', 'Not available'),
                        "opening_hours": place.get('hours', 'Hours not available'),
                        "sentiment_score": analyze_sentiment(review_text),
                        "image_url": place.get('thumbnail', ''),
                        "price": price_num,
                        "price_level": price_str,
                        "food_preference": food_preference
                    }
                    
                    if not any(rest['name'] == restaurant_data['name'] and 
                              rest['address'] == restaurant_data['address'] 
                              for rest in all_restaurants):
                        all_restaurants.append(restaurant_data)
            
        return pd.DataFrame(all_restaurants)
    except Exception as e:
        print(f"Error fetching restaurants: {e}")
        return pd.DataFrame()

def rank_top_entries(df, budget_inr=None, num_results=5):
    if df.empty:
        return pd.DataFrame()
    
    try:
        df_ranked = df.copy()
        
        if 'rating' in df_ranked.columns:
            df_ranked['rating'] = pd.to_numeric(df_ranked['rating'], errors='coerce').fillna(0)
        
        if 'sentiment_score' in df_ranked.columns:
            df_ranked['sentiment_score'] = pd.to_numeric(df_ranked['sentiment_score'], errors='coerce').fillna(0)
        
        if 'price' in df_ranked.columns and budget_inr:
            df_ranked['price'] = pd.to_numeric(df_ranked['price'], errors='coerce').fillna(0)
            df_ranked = df_ranked[df_ranked['price'] * 82.5 <= budget_inr]
        
        if all(col in df_ranked.columns for col in ['rating', 'sentiment_score', 'price']):
            rating_range = df_ranked['rating'].max() - df_ranked['rating'].min()
            df_ranked['normalized_rating'] = (df_ranked['rating'] - df_ranked['rating'].min()) / (rating_range if rating_range > 0 else 1)
            
            sentiment_range = df_ranked['sentiment_score'].max() - df_ranked['sentiment_score'].min()
            df_ranked['normalized_sentiment'] = (df_ranked['sentiment_score'] - df_ranked['sentiment_score'].min()) / (sentiment_range if sentiment_range > 0 else 1)
            
            price_range = (df_ranked['price'] * 82.5).max() - (df_ranked['price'] * 82.5).min()
            df_ranked['normalized_price'] = ((df_ranked['price'] * 82.5) - (df_ranked['price'] * 82.5).min()) / (price_range if price_range > 0 else 1)
            
            df_ranked['overall_score'] = (
                0.5 * df_ranked['normalized_rating'] +
                0.3 * df_ranked['normalized_sentiment'] -
                0.2 * df_ranked['normalized_price']
            )
            
            return df_ranked.nlargest(num_results, 'overall_score')
        else:
            if 'rating' in df_ranked.columns:
                return df_ranked.nlargest(num_results, 'rating')
            else:
                return df_ranked.head(num_results)
            
    except Exception as e:
        print(f"Error in ranking entries: {e}")
        return df.head(num_results)

def get_comprehensive_recommendations(location, budget_inr, num_people, activities, food_preference):
    restaurants_df = fetch_restaurants(location, budget_inr, food_preference)
    landmarks_df = fetch_landmarks(location)
    activities_df = fetch_activities(location, activities)
    gi_products_df = fetch_gi_products(location)
    
    top_restaurants = rank_top_entries(restaurants_df, budget_inr)
    top_landmarks = rank_top_entries(landmarks_df)
    top_activities = rank_top_entries(activities_df, budget_inr)
    top_gi_products = rank_top_entries(gi_products_df)
    
    return {
        'restaurants': top_restaurants,
        'landmarks': top_landmarks,
        'activities': top_activities,
        'gi_products': top_gi_products
    }

if __name__ == "_main_":
    try:
        location = "Reva University, Bengaluru"
        budget_inr = 5000
        num_people = 4
        activities_input = input("Enter preferred activities (comma-separated, e.g., adventure,cultural): ")
        food_preference = "Non-veg"

        activities = [act.strip() for act in activities_input.split(',')]

        recommendations = get_comprehensive_recommendations(
            location, budget_inr, num_people, activities, food_preference
        )

        print("\n" + "="*50)
        print("🏺 LOCAL ARTISAN SHOPS AND TRADITIONAL MARKETS")
        print("="*50)
        if not recommendations['gi_products'].empty:
            for _, row in recommendations['gi_products'].iterrows():
                print(f"\n📍 {row['name'].upper()}")
                print(f"Type: {row['shop_type']}")
                print(f"Rating: {'⭐' * int(row['rating'])} ({row['rating']})")
                print(f"Products: {row['products_type']}")
                print(f"Description: {row['description']}")
                print(f"Address: {row['address']}")
                if row['contact'] != 'Not available':
                    print(f"Contact: {row['contact']}")
                if row['opening_hours'] != 'Hours not available':
                    print(f"Hours: {row['opening_hours']}")
                if row['price_level'] != 'N/A':
                    print(f"Price Level: {row['price_level']}")
        else:
            print("No traditional markets or artisan shops found in this region.")

        print("\n" + "="*50)
        print("🏛️ LANDMARKS AND ATTRACTIONS")
        print("="*50)
        if not recommendations['landmarks'].empty:
            for _, row in recommendations['landmarks'].iterrows():
                print(f"\n📍 {row['name'].upper()}")
                print(f"Category: {row['category']}")
                print(f"Type: {row['type']}")
                print(f"Rating: {'⭐' * int(row['rating'])} ({row['rating']})")
                print(f"Description: {row['description']}")
                print(f"Address: {row['address']}")
                if row['contact'] != 'Not available':
                    print(f"Contact: {row['contact']}")
                if row['opening_hours'] != 'Hours not available':
                    print(f"Hours: {row['opening_hours']}")
                print(f"Current Status: {row['visitor_status']}")
        else:
            print("No landmarks found in this location.")

        print("\n" + "="*50)
        print("🎯 RECOMMENDED ACTIVITIES")
        print("="*50)
        if not recommendations['activities'].empty:
            # Group activities by category
            grouped_activities = recommendations['activities'].groupby('category')
            for category, group in grouped_activities:
                print(f"\n📍 {category.upper()} ACTIVITIES:")
                for _, row in group.iterrows():
                    print(f"\n{row['name']}")
                    print(f"Subcategory: {row['subcategory']}")
                    print(f"Rating: {'⭐' * int(row['rating'])} ({row['rating']})")
                    if row['price'] > 0:
                        print(f"Approximate Cost: ₹{int(row['price'] * 82.5)} per person")
                    print(f"Description: {row['description']}")
                    print(f"Address: {row['address']}")
                    if row['contact'] != 'Not available':
                        print(f"Contact: {row['contact']}")
                    if row['opening_hours'] != 'Hours not available':
                        print(f"Hours: {row['opening_hours']}")
                    print(f"Current Status: {row['status']}")
        else:
            print("No activities found matching your preferences.")

        print("\n" + "="*50)
        print("🍽️ RECOMMENDED RESTAURANTS")
        print("="*50)
        if not recommendations['restaurants'].empty:
            for _, row in recommendations['restaurants'].iterrows():
                print(f"\n📍 {row['name'].upper()}")
                print(f"Cuisine: {row['cuisine_type']}")
                print(f"Rating: {'⭐' * int(row['rating'])} ({row['rating']})")
                print(f"Cost for {num_people} people: ₹{int(row['price'] * 82.5 * num_people)}")
                print(f"Price Level: {row['price_level']}")
                print(f"Description: {row['description']}")
                print(f"Address: {row['address']}")
                if row['contact'] != 'Not available':
                    print(f"Contact: {row['contact']}")
                if row['opening_hours'] != 'Hours not available':
                    print(f"Hours: {row['opening_hours']}")
        else:
            print("No restaurants found within your budget.")

        print("\n" + "="*50)
        print("💰 BUDGET SUMMARY")
        print("="*50)
        
        if not recommendations['restaurants'].empty:
            avg_meal_cost = recommendations['restaurants']['price'].mean() * 82.5 * num_people
            print(f"Average meal cost for {num_people} people: ₹{int(avg_meal_cost)}")
        
        if not recommendations['activities'].empty:
            activities_with_price = recommendations['activities'][recommendations['activities']['price'] > 0]
            if not activities_with_price.empty:
                avg_activity_cost = activities_with_price['price'].mean() * 82.5 * num_people
                print(f"Average activity cost for {num_people} people: ₹{int(avg_activity_cost)}")
        
        print(f"Total budget: ₹{int(budget_inr)}")

    except Exception as e:
        print(f"Error in main execution: {e}")
        print("Please check your inputs and try again.")
