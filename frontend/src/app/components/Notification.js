'use client'
import React, { useState, useEffect } from "react";
import Groq from "groq-sdk";

function Notification() {
  const [location, setLocation] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [notification, setNotification] = useState(null);

  const groq = new Groq({ 
    apiKey: "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", dangerouslyAllowBrowser: true
  });

  async function getPickupLine(location) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate a funny and clean pickup line related to ${location}. Keep it short and casual.`
          }
        ],
        model: "llama3-8b-8192",
      });
      
      return chatCompletion.choices[0]?.message?.content || "Hey there! Check out what's happening around you!";
    } catch (error) {
      console.error("Error generating pickup line:", error);
      return "Hey there! Check out what's happening around you!";
    }
  }

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          setAreaName(data.features[0].place_name);
          console.log(data.features[0].place_name);
        } else {
          setAreaName("Unknown location");
        }
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  async function sendNotification(place) {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        const pickupLine = await getPickupLine(place);
        setNotification(pickupLine);
        
        new Notification("Location Update", {
          body: pickupLine
        });
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  useEffect(() => {
    let intervalId;
    
    if (areaName) {
      intervalId = setInterval(() => {
        sendNotification(areaName);
      }, 2 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [areaName]);

  return (
    <div className="p-4">
      {!location && (
        <button 
          onClick={handleLocationClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Location
        </button>
      )}
      {location && !areaName && <p>Loading location data...</p>}
      {areaName && (
        <div className="space-y-2">
          <p>Location: {areaName}</p>
          {notification && (
            <p className="text-green-600">Latest notification: {notification}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;