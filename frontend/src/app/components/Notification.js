'use client'
import React, { useState } from "react";

function Notification() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [areaName, setAreaName] = useState(null);

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

    // Perform reverse geocoding using Mapbox Geocoding API
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

  return (
    <div>
      {!location && <button onClick={handleLocationClick}>Get Location</button>}
      {location && !areaName && <p>Loading weather data...</p>}
      {areaName && (
        <div>
          <p>Location: {areaName}</p>
        </div>
      )}
    </div>
  );
}

export default Notification;