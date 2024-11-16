// 'use client'
// import React, { useState, useEffect } from 'react';
// import Groq from 'groq-sdk';

// function NotificationApp() {
//   const [permission, setPermission] = useState(Notification.permission);
//   const [location, setLocation] = useState(null);
//   const [areaName, setAreaName] = useState(null);
//   const [notification, setNotification] = useState(null);

//   const groq = new Groq({
//     apiKey: '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',
//     dangerouslyAllowBrowser: true,
//   });

//   // Automatically fetch location on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.log('Geolocation not supported');
//     }
//   }, []); // Empty dependency array ensures it runs once when the component mounts

//   useEffect(() => {
//     if (permission === 'granted' && areaName) {
//       const interval = setInterval(() => {
//         sendLocationNotification(areaName);
//       },  10000); // Trigger every 10 seconds

//       return () => clearInterval(interval);
//     }
//   }, [permission, areaName]); // Trigger when permission and areaName are updated

//   const requestPermission = () => {
//     if ('Notification' in window) {
//       Notification.requestPermission().then((perm) => {
//         setPermission(perm);
//         if (perm === 'granted') {
//           alert('Notifications enabled!');
//         } else {
//           alert('Notification permission denied.');
//         }
//       });
//     } else {
//       alert('Desktop notifications are not supported in this browser.');
//     }
//   };

//   const sendLocationNotification = async (area) => {
//     try {
//       const message = await getPickupLine(area);
//       new Notification('Location-Based Alert!', {
//         body: message,
//       });
//       setNotification(message);
//     } catch (error) {
//       console.error('Error sending location-based notification:', error);
//     }
//   };

//   const getPickupLine = async (location) => {
//     try {
//       const chatCompletion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: 'user',
//             content: `Generate a short note based on any local events happening at the ${location} nearby, like festivals, markets, or concerts. Or Generate a funny and clean pickup line without any intro or so related to ${location}. Keep it short upto 10 words and casual and donot include ay intro or so and any headings and be precise and straight upto the point and generate any one out of the two options randomly and show what you wanted to and never show any kind of confirmatory headings.`,
//           },
//         ],
//         model: 'llama3-8b-8192',
//       });

//       return (
//         chatCompletion.choices[0]?.message?.content ||
//         'Hey there! Check out what’s happening around you!'
//       );
//     } catch (error) {
//       console.error('Error generating pickup line:', error);
//       return 'Hey there! Check out what’s happening around you!';
//     }
//   };

//   const success = (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     setLocation({ latitude, longitude });

//     fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.features.length > 0) {
//           setAreaName(data.features[0].place_name);
//         } else {
//           setAreaName('Unknown location');
//         }
//       })
//       .catch((error) => console.error(error));
//   };

//   const error = () => {
//     console.log('Unable to retrieve your location');
//   };

//   return (
//     <>  
//     </>
//   );
// }

// export default NotificationApp;


// // 'use client'
// // import React, { useState, useEffect } from 'react';
// // import Groq from 'groq-sdk';

// // function NotificationApp() {
// //   const [permission, setPermission] = useState(Notification.permission);
// //   const [location, setLocation] = useState(null);
// //   const [areaName, setAreaName] = useState(null);
// //   const [notification, setNotification] = useState(null);

// //   const groq = new Groq({
// //     apiKey: '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',
// //     dangerouslyAllowBrowser: true,
// //   });

// //   // Automatically fetch location on component mount
// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(success, error);
// //     } else {
// //       console.log('Geolocation not supported');
// //     }
// //   }, []); // Empty dependency array ensures it runs once when the component mounts

// //   useEffect(() => {
// //     if (permission === 'granted' && areaName) {
// //       const interval = setInterval(() => {
// //         sendLocationNotification(areaName);
// //       },  10000); // Trigger every 10 seconds

// //       return () => clearInterval(interval);
// //     }
// //   }, [permission, areaName]); // Trigger when permission and areaName are updated

// //   const requestPermission = () => {
// //     if ('Notification' in window) {
// //       Notification.requestPermission().then((perm) => {
// //         setPermission(perm);
// //         if (perm === 'granted') {
// //           alert('Notifications enabled!');
// //         } else {
// //           alert('Notification permission denied.');
// //         }
// //       });
// //     } else {
// //       alert('Desktop notifications are not supported in this browser.');
// //     }
// //   };

// //   const sendLocationNotification = async (area) => {
// //     try {
// //       const message = await getPickupLine(area);
// //       new Notification({
// //         body: message,
// //       });
// //       setNotification(message);
// //     } catch (error) {
// //       console.error('Error sending location-based notification:', error);
// //     }
// //   };

// //   const getPickupLine = async (location) => {
// //     try {
// //       const chatCompletion = await groq.chat.completions.create({
// //         messages: [
// //           {
// //             role: 'user',
// //             content: Generate a short note based on any local events happening at the ${location} nearby, like festivals, markets, or concerts. Or Generate a funny and clean pickup line without any intro or so related to ${location}. Keep it short upto 10 words and casual and donot include ay intro or so and any headings and be precise and straight upto the point and generate any one out of the two options randomly and show what you wanted to and never show any kind of confirmatory headings.,
// //           },
// //         ],
// //         model: 'llama3-8b-8192',
// //       });

// //       return (
// //         chatCompletion.choices[0]?.message?.content ||
// //         'Hey there! Check out what’s happening around you!'
// //       );
// //     } catch (error) {
// //       console.error('Error generating pickup line:', error);
// //       return 'Hey there! Check out what’s happening around you!';
// //     }
// //   };

// //   const success = (position) => {
// //     const latitude = position.coords.latitude;
// //     const longitude = position.coords.longitude;
// //     setLocation({ latitude, longitude });

// //     fetch(
// //       https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g
// //     )
// //       .then((response) => response.json())
// //       .then((data) => {
// //         if (data.features.length > 0) {
// //           setAreaName(data.features[0].place_name);
// //         } else {
// //           setAreaName('Unknown location');
// //         }
// //       })
// //       .catch((error) => console.error(error));
// //   };

// //   const error = () => {
// //     console.log('Unable to retrieve your location');
// //   };

// //   return (
// //     <>  
// //     </>
// //   );
// // }

// // export default NotificationApp;


// 'use client';
// import React, { useState, useEffect } from 'react';
// import Groq from 'groq-sdk';

// function NotificationApp() {
//   const [permission, setPermission] = useState(Notification.permission);
//   const [location, setLocation] = useState(null);
//   const [areaName, setAreaName] = useState(null);
//   const [notification, setNotification] = useState(null);

//   const groq = new Groq({
//     apiKey: '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',
//     dangerouslyAllowBrowser: true,
//   });

//   // Fetch location and area name on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []); // Runs once on mount

//   // Start notifications once location and permissions are ready
//   useEffect(() => {
//     if (permission === 'granted' && areaName) {
//       const interval = setInterval(() => {
//         sendLocationNotification(areaName);
//       }, 10000); // 1-hour interval

//       return () => clearInterval(interval);
//     }
//   }, [permission, areaName]); // Runs whenever permission or areaName changes

//   // Request notification permission on mount if not already granted
//   useEffect(() => {
//     if (permission === 'default') {
//       Notification.requestPermission().then((perm) => setPermission(perm));
//     }
//   }, []); // Runs once on mount

//   const sendLocationNotification = async (area) => {
//     try {
//       const message = await getPickupLine(area);
//       new Notification('Local Event or Note', {
//         body: message,
//       });
//       setNotification(message);
//     } catch (error) {
//       console.error('Error sending location-based notification:', error);
//     }
//   };

//   const getPickupLine = async (location) => {
//     try {
//       const chatCompletion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: 'user',
//             content: Generate a short note based on any local events happening at the ${location} nearby, like festivals, markets, or concerts. Or Generate a funny and clean pickup line without any intro or so related to ${location}. Keep it short upto 10 words and casual and donot include ay intro or so and any headings and be precise and straight upto the point and generate any one out of the two options randomly and show what you wanted to and never show any kind of confirmatory headings.,
//           },
//         ],
//         model: 'llama3-8b-8192',
//       });

//       return (
//         chatCompletion.choices[0]?.message?.content ||
//         'Hey there! Check out what’s happening around you!'
//       );
//     } catch (error) {
//       console.error('Error generating pickup line:', error);
//       return 'Hey there! Check out what’s happening around you!';
//     }
//   };

//   const success = (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     setLocation({ latitude, longitude });

//     fetch(
//       https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW9oaXRobjIwMDQiLCJhIjoiY20zYWo4bTZvMHZzZzJpc2E1dXB2a2I0MyJ9.PNiLG3Jvl628G4TwrTHO-g
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.features.length > 0) {
//           setAreaName(data.features[0].place_name);
//         } else {
//           setAreaName('Unknown location');
//         }
//       })
//       .catch((error) => console.error('Error fetching area name:', error));
//   };

//   const error = () => {
//     console.error('Unable to retrieve your location.');
//   };

//   return null; // No UI elements needed
// }

// export default NotificationApp;


'use client'
import React, { useState, useEffect } from 'react';
import Groq from 'groq-sdk';

function NotificationApp() {
  const [permission, setPermission] = useState(Notification.permission);
  const [location, setLocation] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [notification, setNotification] = useState(null);

  const groq = new Groq({
    apiKey: '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',
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
            content: `Generate a small note on nearby local events happening nearby ${location} based on the date and time, markets, or concerts. Or any funny and clean pickup line related to ${location}. Keep it short and casual.`,
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
      <button onClick={handleLocationClick}>Get Notifications</button>
    </>
  );
}

export default NotificationApp;