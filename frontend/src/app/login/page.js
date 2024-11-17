// // 'use client';
// // import React, { useState } from "react";
// // import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// // function LoginForm() {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });

// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');

// //   const router = useRouter(); // Initialize useRouter

// //   // Handle input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const { email, password } = formData;

// //     // Validation check for empty fields
// //     if (!email || !password) {
// //       setErrorMessage('Both fields are required');
// //       return;
// //     }

// //     try {
// //       // Sending POST request to the backend for login
// //       const response = await fetch("http://127.0.0.1:5000/auth/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, password }),  // Send the form data to backend
// //       });

// //       const data = await response.json();
// //       console.log('Login Response:', data); // Debug the response

// //       if (response.ok) {
// //         // Store the JWT token in localStorage on successful login
// //         localStorage.setItem("access_token", data.access_token);

// //         setSuccessMessage('Login successful!');
// //         setErrorMessage(''); // Clear any previous error messages

// //         // Redirect to the TravelPlanner page after a successful login
// //         setTimeout(() => {
// //           router.push("/TravelPlanner"); // Navigate to the TravelPlanner page
// //         }, 1500); // Wait for 1.5 seconds before redirecting
// //       } else {
// //         // Display the error message if login fails
// //         setErrorMessage(data.message || 'Login failed');
// //         setSuccessMessage(''); // Clear success message on error
// //       }
// //     } catch (error) {
// //       // Catch any errors during the login process
// //       console.error("Login error:", error);  // Log the error
// //       setErrorMessage('An error occurred during login');
// //       setSuccessMessage(''); // Clear success message on error
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //       <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-[500px] max-md:h-auto">
// //         <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
// //           <h1 className="text-4xl font-bold text-white text-center">LOGIN</h1>
// //           <p className="mt-4 text-sm text-center text-white">
// //             New to this site?{" "}
// //             <a href="/signup" className="underline hover:text-gray-300">
// //               Sign Up
// //             </a>
// //           </p>

// //           {/* Error or Success Message */}
// //           {errorMessage && (
// //             <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
// //           )}
// //           {successMessage && (
// //             <div className="mt-4 text-green-500 text-sm text-center">{successMessage}</div>
// //           )}

// //           {/* Email input */}
// //           <div className="mt-6 w-full">
// //             <input
// //               id="email"
// //               name="email"
// //               type="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="Enter your email"
// //               className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
// //               required
// //             />
// //           </div>

// //           {/* Password input */}
// //           <div className="mt-4 w-full">
// //             <input
// //               id="password"
// //               name="password"
// //               type="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="Enter your password"
// //               className="w-full px-4 py-4 text-cyan-50 bg-transparent rounded-md text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
// //               required
// //             />
// //           </div>

// //           {/* Forgot password link */}
// //           <div className="mt-4 w-full text-right">
// //             <a
// //               href="/forgot-password"
// //               className="text-sm text-white underline hover:text-gray-300"
// //             >
// //               Forgot password?
// //             </a>
// //           </div>

// //           {/* Submit button */}
// //           <button
// //             type="submit"
// //             className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
// //           >
// //             LOGIN
// //           </button>
// //         </form>
// //       </main>
// //     </div>
// //   );
// // }

// // export default LoginForm;


// 'use client';
// import React, { useState } from "react";
// import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const router = useRouter(); // Initialize useRouter

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { email, password } = formData;

//     // Validation check for empty fields
//     if (!email || !password) {
//       setErrorMessage('Both fields are required');
//       return;
//     }

//     try {
//       // Sending POST request to the backend for login
//       const response = await fetch("http://127.0.0.1:5000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),  // Send the form data to backend
//       });

//       const data = await response.json();
//       console.log('Login Response:', data); // Debug the response

//       if (response.ok) {
//         // Store the JWT token in localStorage on successful login
//         localStorage.setItem("access_token", data.access_token);

//         setSuccessMessage('Login successful!');
//         setErrorMessage(''); // Clear any previous error messages

//         // Redirect to the TravelPlanner page after a successful login
//         setTimeout(() => {
//           router.push("/TravelPlanner"); // Navigate to the TravelPlanner page
//         }, 1500); // Wait for 1.5 seconds before redirecting
//       } else {
//         // Display the error message if login fails
//         setErrorMessage(data.message || 'Login failed');
//         setSuccessMessage(''); // Clear success message on error
//       }
//     } catch (error) {
//       // Catch any errors during the login process
//       console.error("Login error:", error);  // Log the error
//       setErrorMessage('An error occurred during login');
//       setSuccessMessage(''); // Clear success message on error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-[500px] max-md:h-auto">
//         <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
//           <h1 className="text-4xl font-bold text-white text-center">LOGIN</h1>
//           <p className="mt-4 text-sm text-center text-white">
//             New to this site?{" "}
//             <a href="/signup" className="underline hover:text-gray-300">
//               Sign Up
//             </a>
//           </p>

//           {/* Error or Success Message */}
//           {errorMessage && (
//             <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
//           )}
//           {successMessage && (
//             <div className="mt-4 text-green-500 text-sm text-center">{successMessage}</div>
//           )}

//           {/* Email input */}
//           <div className="mt-6 w-full">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
//               required
//             />
//           </div>

//           {/* Password input */}
//           <div className="mt-4 w-full">
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-4 text-cyan-50 bg-transparent rounded-md text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Forgot password link */}
//           <div className="mt-4 w-full text-right">
//             <a
//               href="/forgot-password"
//               className="text-sm text-white underline hover:text-gray-300"
//             >
//               Forgot password?
//             </a>
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
//           >
//             LOGIN
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

// export default LoginForm;

'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Both fields are required');
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setTimeout(() => {
          router.push("/TravelPlanner");
        }, 1500);
      } else {
        setErrorMessage(data.message || 'Login failed');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage('An error occurred during login');
      setSuccessMessage('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen gradient-background ${
      isDarkMode ? 'bg-gray-900' : ''
    }`}>
      {/* Theme Toggle Button for Mobile */}
      <button
        onClick={toggleDarkMode}
        className={`md:hidden fixed top-4 right-4 p-3 rounded-full shadow-lg flex items-center gap-2 ${
          isDarkMode 
            ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {isDarkMode ? (
          <>
            <Sun size={20} />
            <span className="text-sm">Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={20} />
            <span className="text-sm">Dark Mode</span>
          </>
        )}
      </button>

      <div className="w-full max-w-4xl p-6 md:p-8">
        <div className={`grid md:grid-cols-2 gap-8 rounded-2xl shadow-xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Left side - Illustration */}
          <div className={`hidden md:flex flex-col justify-center items-center p-8 relative ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
              : 'bg-gradient-to-br from-purple-100 to-purple-200'
          }`}>
            {/* Theme Toggle Button for Desktop */}
            <button
              onClick={toggleDarkMode}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun size={20} />
                  <span className="text-sm">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <span className="text-sm">Dark Mode</span>
                </>
              )}
            </button>
            
            {/* Logo */}
            <div className="mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className={`w-20 h-20 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-800'
                } fill-current`}>
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" />
                <path d="M50 15 L65 40 H35 Z" fill="currentColor" />
                <text 
                  x="50" 
                  y="70" 
                  fontSize="12" 
                  textAnchor="middle" 
                  fill="currentColor" 
                  fontWeight="bold">
                  VOYAGE
                </text>
              </svg>
            </div>
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-800'
              }`}>Welcome to Voyage</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-purple-600'}>
                Plan your next adventure with us
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center">
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Login</h1>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  New to this site?{" "}
                  <a href="/signup" className="text-purple-500 hover:text-purple-400 font-medium">
                    Sign Up
                  </a>
                </p>
              </div>

              {(errorMessage || successMessage) && (
                <div className={`p-3 rounded-lg text-center ${
                  errorMessage 
                    ? 'bg-red-900/20 text-red-400' 
                    : 'bg-green-900/20 text-green-400'
                }`}>
                  {errorMessage || successMessage}
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                  />
                  <span className={`ml-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-purple-500 hover:text-purple-400">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                    : 'bg-purple-500 hover:bg-purple-400 text-white'
                }`}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
