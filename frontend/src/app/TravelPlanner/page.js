<<<<<<< HEAD
'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
=======
'use client'
import { useState } from "react";

// Groq SDK initialization
import Groq from "groq-sdk";
import NotificationApp from "../components/Notification";

// Initialize Groq client with the API key directly in the frontend (be mindful of security)
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});
>>>>>>> c46d5810188632d2ab81572fb1708ac8f5576794

const TravelPlanner = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    budget: 0,
    groupSize: 0,
    activities: "",
    foodPreferences: "veg",
  });

  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // If no token, redirect to login page
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sign-out function
  const handleLogout = () => {
    // Remove JWT token from localStorage (or sessionStorage)
    localStorage.removeItem("access_token");

    // Redirect the user to the login page
    router.push("/login");
  };

  const getLocationFromCoordinates = async (lat, lng) => {
    const mapboxApiKey = "pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const location = data.features && data.features.length > 0 ? data.features[0].place_name : "Unknown Location";
      return location;
    } catch (error) {
      console.error("Error fetching location from coordinates:", error);
      return "Unknown Location";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowOverlay(true);

    // Fetch user's location when submitting the form
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode the coordinates to get the location name
          const locationName = await getLocationFromCoordinates(latitude, longitude);
          setLocation(locationName);  // Set the location

          // Prepare data for API call
          const requestData = {
            location: locationName,
            budget: { amount: formData.budget },
            num_people: formData.groupSize,
            food_preference: formData.foodPreferences,
            activities: formData.activities.split(',').map(item => item.trim()),
          };

          try {
            // Send data to the backend
            const response = await fetch("/api/recommendations", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify(requestData),
            });
<<<<<<< HEAD

            if (!response.ok) {
              throw new Error('Failed to fetch recommendations');
            }

            const recommendations = await response.json();

            // Convert JSON to readable text
            const formattedItinerary = recommendations.recommendations
              .map((item) => `${item.name}: ${item.description}`)
              .join("\n\n");

            setItinerary(formattedItinerary);
=======
            const cleanItinerary = response.choices[0].message.content.replace(/[^a-zA-Z0-9\s.,!?-]/g, "").trim();
            setItinerary(cleanItinerary);
>>>>>>> c46d5810188632d2ab81572fb1708ac8f5576794
          } catch (error) {
            setError("Error fetching recommendations: " + error.message);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Unable to retrieve your location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return (
    <>
<<<<<<< HEAD
      <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white fixed w-full z-10">
        <div className="text-3xl font-bold font-serif cursor-pointer">Voyage</div>
        <ul className="flex items-center space-x-6 text-lg">
          <div className="relative group">
            <button onClick={handleLogout} className="hover:text-slate-400 cursor-pointer">
              Log Out
=======
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white fixed w-full z-10">
          <div className="text-3xl font-bold font-serif cursor-pointer">
            Voyage
          </div>
          <ul className="flex items-center space-x-6 text-lg">
            <div className="relative group">
              <button className="hover:text-slate-400 cursor-pointer">
                Log Out
              </button>
            </div>
          </ul>
        </nav>
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome To The New Era Of Travelling!</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center">
          <label className="mb-2 text-lg font-medium">Budget (INR)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
            placeholder="Enter budget in INR"
          />

          <label className="mb-2 text-lg font-medium">Group Size</label>
          <input
            type="number"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleInputChange}
            className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
          />

          <label className="mb-2 text-lg font-medium">Activities (comma-separated)</label>
          <input
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleInputChange}
            className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
            placeholder="Enter activities (e.g., museums, parks)"
          />

          <label className="mb-2 text-lg font-medium">Food Preferences</label>
          <select
            name="foodPreferences"
            value={formData.foodPreferences}
            onChange={handleInputChange}
            className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>

          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        </div>
      </form>
      <NotificationApp/>

      {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Your Personalized Itinerary</h3>
            <p className="text-lg mb-4"><strong>Location:</strong> {location}</p>
            <p className="text-lg mb-4"><strong>Budget:</strong> ₹{formData.budget}</p>

            <div className="max-h-80 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-lg">{itinerary}</pre>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setShowOverlay(false)}
            >
              Close
>>>>>>> c46d5810188632d2ab81572fb1708ac8f5576794
            </button>
          </div>
        </ul>
      </nav>

      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome To The New Era Of Travelling!</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-medium">Budget (INR)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
              placeholder="Enter budget in INR"
            />

            <label className="mb-2 text-lg font-medium">Group Size</label>
            <input
              type="number"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleInputChange}
              className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
            />

            <label className="mb-2 text-lg font-medium">Activities (comma-separated)</label>
            <input
              type="text"
              name="activities"
              value={formData.activities}
              onChange={handleInputChange}
              className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
              placeholder="Enter activities (e.g., museums, parks)"
            />

            <label className="mb-2 text-lg font-medium">Food Preferences</label>
            <select
              name="foodPreferences"
              value={formData.foodPreferences}
              onChange={handleInputChange}
              className="p-3 w-full md:w-2/3 border border-gray-300 rounded-lg mb-4 text-lg"
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
          </div>
        </form>

        {showOverlay && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Your Personalized Itinerary</h3>
              <p className="text-lg mb-4"><strong>Location:</strong> {location}</p>
              <p className="text-lg mb-4"><strong>Budget:</strong> ₹{formData.budget}</p>
              <div className="max-h-80 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-lg">{itinerary}</pre>
              </div>

              <button
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => setShowOverlay(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelPlanner;
