"use client";

import { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import Sentiment from "sentiment";
import Groq from "groq-sdk";
import { getJson } from "serpapi";
import NotificationApp from "../components/Notification";
import { MapPin, Users, DollarSign, Activity, Loader2, Link } from 'lucide-react';

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const sentiment = new Sentiment();
const serpAPIKey = "c93c565fe1ee63a071a57c5200d01ff2c9e06f293c0a57858724b52fafe701c7";
const mapboxToken = "pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g";

const INITIAL_FORM_STATE = {
  location: "",
  budget: "",
  groupSize: "",
  activities: "",
  foodPreferences: "veg",
  fullAddress: "",
};

const CATEGORIES = [
  { query: "restaurants", label: "Restaurants", color: "text-red-500" },
  { query: "landmarks", label: "Landmarks", color: "text-blue-500" },
  { query: "hotels", label: "Places to Stay", color: "text-green-500" },
  { query: "hidden gems", label: "Hidden Gems", color: "text-purple-500" },
  { query: "handmade materials", label: "Local Crafts", color: "text-amber-500" }
];

const TravelPlanner = () => {
  // All existing state declarations and functions remain exactly the same
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [itinerary, setItinerary] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapCenter, setMapCenter] = useState([20, 78]);
  const [mapZoom, setMapZoom] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // All existing handler functions remain exactly the same
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getDetailedAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
      );

      if (!response.ok) {
        throw new Error("Mapbox API request failed");
      }

      const data = await response.json();
      const features = data.features[0];

      const addressComponents = features.context || [];
      const fullAddress = [
        features.text,
        ...addressComponents.map((c) => c.text),
      ].join(", ");

      return {
        locationName: features.text,
        fullAddress: fullAddress,
      };
    } catch (err) {
      console.error("Error getting address:", err);
      throw new Error("Failed to get detailed address");
    }
  };

  const analyzeSentiment = (reviews) => {
    if (!reviews || !Array.isArray(reviews)) return 0;

    const sentimentScores = reviews.map((review) => {
      const result = sentiment.analyze(review);
      return result.score;
    });

    return sentimentScores.reduce((acc, score) => acc + score, 0) / sentimentScores.length;
  };

  const handleLocationDetection = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const addressInfo = await getDetailedAddress(latitude, longitude);

            setFormData((prev) => ({
              ...prev,
              location: addressInfo.locationName,
              fullAddress: addressInfo.fullAddress,
            }));

            setMapCenter([latitude, longitude]);
            setMapZoom(13);
            setLoading(false);
          } catch (err) {
            setError("Could not determine your location. Please enter it manually.");
            setLoading(false);
          }
        },
        (err) => {
          setError("Location access denied. Please enter your location manually.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  const generateItinerary = async () => {
    const prompt = `Create a 6-hour itinerary for ${formData.location} with these preferences:
      - Budget: ${formData.budget} INR
      - Group size: ${formData.groupSize}
      - Activities: ${formData.activities}
      - Food preference: ${formData.foodPreferences}
      Make sure the itinerary is very short and covers important and essential points and provide only 2 points per each hour and return the output in JSON format`;
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  };

  const fetchRecommendations = async () => {
    let allRecommendations = [];
    let locations = [];

    try {
      for (const category of CATEGORIES) {
        const searchResponse = await getJson({
          engine: "google_maps",
          type: "search",
          api_key: serpAPIKey,
          q: '${category.query} in ${formData.location}',
          location: formData.location,
          num: 10, // Fetch more results for better filtering
        });

        const results = searchResponse.local_results || [];

        const processedResults = results.map((place) => {
          const sentimentScore = analyzeSentiment(place.reviews || []);

          return {
            name: place.title || "Unknown",
            rating: parseFloat(place.rating || 0),
            address: place.address || "No address available",
            bookingLink: place.website || place.link,
            placeType: category.label,
            sentimentScore: sentimentScore,
            reviews: place.reviews || [],
            gps_coordinates: place.gps_coordinates,
          };
        });

        const top5Places = processedResults
          .sort((a, b) => {
            const scoreA = a.rating * 0.7 + a.sentimentScore * 0.3;
            const scoreB = b.rating * 0.7 + b.sentimentScore * 0.3;
            return scoreB - scoreA;
          })
          .slice(0, 5);

        allRecommendations.push(...top5Places);

        top5Places.forEach((place) => {
          if (place.gps_coordinates) {
            locations.push({
              name: place.name,
              lat: place.gps_coordinates.latitude,
              lng: place.gps_coordinates.longitude,
              placeType: category.label,
            });
          }
        });

        if (top5Places.length > 0 && top5Places[0].gps_coordinates) {
          setMapCenter([
            top5Places[0].gps_coordinates.latitude,
            top5Places[0].gps_coordinates.longitude,
          ]);
          setMapZoom(13);
        }
      }

      setMapLocations(locations);
      return allRecommendations;
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      throw new Error("Failed to fetch recommendations");
    }
  };

  const handleCardClick = (bookingLink) => {
    if (bookingLink) {
      window.open(bookingLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const recommendationsList = await fetchRecommendations();
      setRecommendations(recommendationsList);

      const itineraryContent = await generateItinerary();
      setItinerary(itineraryContent);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Error generating travel plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className={`min-h-screen gradient-background
     ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`px-6 py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-purple-600'} shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="w-8 h-8 text-white fill-current">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" />
              <path d="M50 15 L65 40 H35 Z" fill="currentColor" />
              <text x="50" y="70" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">
                VOYAGE
              </text>
            </svg>
            <span className="text-2xl font-bold text-white">Voyage</span>
          </div>
          <div className="flex">
          <div className=" mx-10" onClick={handleLocationDetection}>
            <NotificationApp />
          </div>
          <button className="bg-purple-500 ml-10 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          ><a href="./HomePage">LogOut</a></button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <form onSubmit={handleSubmit} className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-xl shadow-lg space-y-6`}>
          <h2 className="text-2xl font-bold mb-6">Plan Your Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Destination"
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                required
              />
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Budget (INR)"
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                required
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleInputChange}
                placeholder="Group Size"
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                required
              />
            </div>

            <div className="relative">
              <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="activities"
                value={formData.activities}
                onChange={handleInputChange}
                placeholder="Activities (e.g., hiking, shopping)"
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center space-x-2 ${
              isDarkMode 
                ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                : 'bg-purple-500 hover:bg-purple-400 text-white'
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Generating Plan...</span>
              </>
            ) : (
              <span>Generate Plan</span>
            )}
          </button>
        </form>

        <div className="flex flex-col md:flex-row mt-8 space-y-6 md:space-y-0 md:space-x-6">
          <div className={`flex-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-y-auto max-h-[600px] p-6`}>
            {itinerary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Your Itinerary</h2>
                <div className="space-y-4">
                  {itinerary.split("\n").map((line, index) => {
                    const timeAndActivity = line.split(":");
                    if (timeAndActivity.length === 2) {
                      return (
                        <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                          <strong className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                            {timeAndActivity[0].trim()}
                          </strong>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {timeAndActivity[1].trim()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Top Recommendations</h2>
                {CATEGORIES.map((category) => {
                  const categoryItems = recommendations.filter(
                    (rec) => rec.placeType === category.label
                  );
                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={category.label} className="mb-8">
                      <h3 className={`text-lg font-semibold mb-4 ${category.color}`}>
                        {category.label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categoryItems.map((rec, index) => (
                          <div
                            key={index}
                            onClick={() => handleCardClick(rec.bookingLink)}
                            className={`${
                              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                            } p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-lg truncate">{rec.name}</h4>
                              <span className={`text-sm px-3 py-1 rounded-full ${
                                rec.sentimentScore > 0
                                  ? 'bg-green-100 text-green-800'
                                  : rec.sentimentScore < 0
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {rec.sentimentScore > 0
                                  ? "Positive"
                                  : rec.sentimentScore < 0
                                    ? "Negative"
                                    : "Neutral"}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {rec.rating > 0 && (
                                <p className="text-yellow-500">
                                  {"★".repeat(Math.round(rec.rating))}
                                  <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    ({rec.rating})
                                  </span>
                                </p>
                              )}
                              <p className={`text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {rec.address}
                              </p>
                              {rec.bookingLink && (
                                <p className="text-purple-500 text-sm hover:underline">
                                  View Details →
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="rounded-lg overflow-hidden">
              <Map
                center={mapCenter}
                zoom={mapZoom}
                width={600}
                height={400}
              >
                {mapLocations.map((loc, idx) => (
                  <Marker
                    key={idx}
                    anchor={[loc.lat, loc.lng]}
                    color={loc.placeType === "restaurant" ? "#EF4444" : "#3B82F6"}
                  />
                ))}
              </Map>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelPlanner;