'use client'
import React, { useState, useEffect } from 'react';
import Groq from 'groq-sdk';

function NotificationApp() {
  const [permission, setPermission] = useState(Notification.permission);
  const [location, setLocation] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [notification, setNotification] = useState(null);

  const groq = new Groq({
    apiKey: 'API_KEY',
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (permission === 'granted') {
      const interval = setInterval(() => {
        if (areaName) {
          sendLocationNotification(areaName);
        }
      }, 10000); // Trigger every 10 seconds

      return () => clearInterval(interval);
    }
  }, [permission, areaName]);

  const requestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        if (perm === 'granted') {
          alert('Notifications enabled!');
        } else {
          alert('Notification permission denied.');
        }
      });
    } else {
      alert('Desktop notifications are not supported in this browser.');
    }
  };

  const sendLocationNotification = async (area) => {
    try {
      const message = await getPickupLine(area);
      new Notification('Location-Based Alert!', {
        body: message,
      });
      setNotification(message);
    } catch (error) {
      console.error('Error sending location-based notification:', error);
    }
  };

  const getPickupLine = async (location) => {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Generate a funny and clean pickup line related to ${location} or generate a notification based on nearby local events, markets to ${location} mostly generate about the local events, markets. Keep it short and the max words you can use in your entire output is 10 and never ever exceed the word limit im giving you and never include any kind of introduction or heading or title in the output.`,
          },
        ],
        model: 'llama3-8b-8192',
      });

      return (
        chatCompletion.choices[0]?.message?.content ||
        'Hey there! Check out what’s happening around you!'
      );
    } catch (error) {
      console.error('Error generating pickup line:', error);
      return 'Hey there! Check out what’s happening around you!';
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          setAreaName(data.features[0].place_name);
        } else {
          setAreaName('Unknown location');
        }
      })
      .catch((error) => console.error(error));
  };

  const error = () => {
    console.log('Unable to retrieve your location');
  };

  return (
    <>
      <button className="bg-purple-500 ml-10 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50" onClick={handleLocationClick}>Get Location</button>
    </>
  );
}

export default NotificationApp;
