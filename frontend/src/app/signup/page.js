// // 'use client';
// // import React, { useState } from "react";
// // import Image from "next/image";
// // import bg from "../media/japan-background-digital-art_23-2151546140.png";

// // function SignUpPage() {
// //   // State to hold form data, matching the backend field names
// //   const [formData, setFormData] = useState({
// //     Name: "",        // Updated to match backend's expected field
// //     username: "",    // Added username field
// //     email: "",
// //     phone: "",       // phone instead of mobile
// //     password: "",
// //   });

// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");

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
// //     const { Name, username, email, phone, password } = formData;

// //     if (!Name || !username || !email || !phone || !password) {
// //       setErrorMessage("All fields are required");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://127.0.0.1:5000/auth/signup", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),  // Send the updated formData
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setSuccessMessage("User created successfully!");
// //         setErrorMessage(""); // Clear any previous error messages
// //         // Optionally, redirect the user to the login page after successful signup
// //         // window.location.href = "/login"; 
// //       } else {
// //         console.log("Error response data:", data);  // Log the error response data
// //         setErrorMessage(data.message || "Something went wrong");
// //         setSuccessMessage(""); // Clear success message on error
// //       }
// //     } catch (error) {
// //       console.error("Error details:", error);  // Log the error details for better insight
// //       setErrorMessage("An error occurred while signing up");
// //       setSuccessMessage(""); // Clear success message on error
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //       <main className="flex items-center justify-between px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-4xl w-full h-auto">
// //         {/* Left Image Section */}
// //         <div className="hidden lg:block w-1/2">
// //           <Image
// //             src={bg} // Adjusted the path
// //             alt="Sign Up Illustration"
// //             className="w-96 h-full object-cover rounded-lg"
// //           />
// //         </div>

// //         {/* Right Form Section */}
// //         <div className="flex flex-col w-full lg:w-1/2">
// //           <form
// //             className="w-full flex flex-col items-center"
// //             onSubmit={handleSubmit}
// //           >
// //             <h1 className="text-4xl font-bold text-white text-center">Sign Up</h1>
// //             <p className="mt-4 text-sm text-center text-white">
// //               Already a member?{" "}
// //               <a href="/login" className="underline hover:text-gray-300">
// //                 Log In
// //               </a>
// //             </p>

// //             {/* Error or Success Message */}
// //             {errorMessage && (
// //               <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
// //             )}
// //             {successMessage && (
// //               <div className="mt-4 text-green-500 text-sm text-center">{successMessage}</div>
// //             )}

// //             <div className="mt-6 w-full">
// //               <input
// //                 id="Name"
// //                 name="Name"
// //                 type="text"
// //                 value={formData.Name}
// //                 onChange={handleChange}
// //                 placeholder="Enter your full name"
// //                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
// //                 required
// //               />
// //             </div>

// //             <div className="mt-4 w-full">
// //               <input
// //                 id="username"
// //                 name="username"
// //                 type="text"
// //                 value={formData.username}
// //                 onChange={handleChange}
// //                 placeholder="Enter your username"
// //                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
// //                 required
// //               />
// //             </div>

// //             <div className="mt-4 w-full">
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 placeholder="Enter your email"
// //                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
// //                 required
// //               />
// //             </div>

// //             <div className="mt-4 w-full">
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 placeholder="Enter your password"
// //                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
// //                 required
// //               />
// //             </div>

// //             <div className="mt-4 w-full">
// //               <input
// //                 id="phone"
// //                 name="phone"
// //                 type="tel"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 placeholder="Enter your mobile number"
// //                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
// //                 required
// //               />
// //             </div>

// //             <div className="flex flex-col items-start mt-6 w-full max-md:mt-4">
// //               <label className="flex items-center text-white text-md max-md:text-sm">
// //                 <input type="checkbox" className="mr-2" />
// //                 I agree to the code of conduct
// //               </label>
// //               <label className="flex items-center text-white text-md mt-2 max-md:text-sm">
// //                 <input type="checkbox" className="mr-2" />
// //                 Join the community
// //               </label>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
// //             >
// //               Register
// //             </button>
// //           </form>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default SignUpPage;


// 'use client';
// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter } from 'next/navigation';  // Import the useRouter hook
// import bg from "../media/japan-background-digital-art_23-2151546140.png";

// function SignUpPage() {
//   // State to hold form data, matching the backend field names
//   const [formData, setFormData] = useState({
//     Name: "",        // Updated to match backend's expected field
//     username: "",    // Added username field
//     email: "",
//     phone: "",       // phone instead of mobile
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const router = useRouter();  // Initialize useRouter hook

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
//     const { Name, username, email, phone, password } = formData;

//     if (!Name || !username || !email || !phone || !password) {
//       setErrorMessage("All fields are required");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),  // Send the updated formData
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("User created successfully!");
//         setErrorMessage(""); // Clear any previous error messages
//         // Redirect to the login page after successful signup
//         setTimeout(() => {
//           router.push("/login");  // Redirect to login page
//         }, 2000);  // Delay for 2 seconds before redirect (optional)
//       } else {
//         console.log("Error response data:", data);  // Log the error response data
//         setErrorMessage(data.message || "Something went wrong");
//         setSuccessMessage(""); // Clear success message on error
//       }
//     } catch (error) {
//       console.error("Error details:", error);  // Log the error details for better insight
//       setErrorMessage("An error occurred while signing up");
//       setSuccessMessage(""); // Clear success message on error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <main className="flex items-center justify-between px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-4xl w-full h-auto">
//         {/* Left Image Section */}
//         <div className="hidden lg:block w-1/2">
//           <Image
//             src={bg} // Adjusted the path
//             alt="Sign Up Illustration"
//             className="w-96 h-full object-cover rounded-lg"
//           />
//         </div>

//         {/* Right Form Section */}
//         <div className="flex flex-col w-full lg:w-1/2">
//           <form
//             className="w-full flex flex-col items-center"
//             onSubmit={handleSubmit}
//           >
//             <h1 className="text-4xl font-bold text-white text-center">Sign Up</h1>
//             <p className="mt-4 text-sm text-center text-white">
//               Already a member?{" "}
//               <a href="/login" className="underline hover:text-gray-300">
//                 Log In
//               </a>
//             </p>

//             {/* Error or Success Message */}
//             {errorMessage && (
//               <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
//             )}
//             {successMessage && (
//               <div className="mt-4 text-green-500 text-sm text-center">{successMessage}</div>
//             )}

//             <div className="mt-6 w-full">
//               <input
//                 id="Name"
//                 name="Name"
//                 type="text"
//                 value={formData.Name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
//                 required
//               />
//             </div>

//             <div className="mt-4 w-full">
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Enter your username"
//                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
//                 required
//               />
//             </div>

//             <div className="mt-4 w-full">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
//                 required
//               />
//             </div>

//             <div className="mt-4 w-full">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
//                 required
//               />
//             </div>

//             <div className="mt-4 w-full">
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your mobile number"
//                 className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default SignUpPage;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react"; // Import icons
import bg from "../media/japan-background-digital-art_23-2151546140.png";

function SignUpPage() {
  const [formData, setFormData] = useState({
    Name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

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
    const { Name, username, email, phone, password } = formData;

    if (!Name || !username || !email || !phone || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("User created successfully!");
        setErrorMessage("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error details:", error);
      setErrorMessage("An error occurred while signing up");
      setSuccessMessage("");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } gradient-background`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-3 rounded-full shadow-lg flex items-center gap-2 ${
          isDarkMode
            ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
            : "bg-white text-gray-600 hover:bg-gray-50"
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
        <div
          className={`grid md:grid-cols-2 gap-8 rounded-2xl shadow-xl overflow-hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Left Side - Illustration */}
          <div
            className={`hidden md:flex flex-col justify-center items-center p-8 relative ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-600"
                : "bg-gradient-to-br from-purple-100 to-purple-200"
            }`}
          >
            <Image
              src={bg}
              alt="Sign Up Illustration"
              className="w-96 h-auto rounded-lg"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center">
                <h1
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sign Up
                </h1>
                <p
                  className={`mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Already a member?{" "}
                  <a
                    href="/login"
                    className="text-purple-500 hover:text-purple-400 font-medium"
                  >
                    Log In
                  </a>
                </p>
              </div>

              {(errorMessage || successMessage) && (
                <div
                  className={`p-3 rounded-lg text-center ${
                    errorMessage
                      ? "bg-red-900/20 text-red-400"
                      : "bg-green-900/20 text-green-400"
                  }`}
                >
                  {errorMessage || successMessage}
                </div>
              )}

              {["Name", "username", "email", "phone", "password"].map(
                (field) => (
                  <div className="relative" key={field}>
                    <input
                      id={field}
                      name={field}
                      type={field === "password" ? "password" : "text"}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      className={`w-full pl-4 pr-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                      required
                    />
                  </div>
                )
              )}

              <button
                type="submit"
                className={`w-full py-3 px-4 font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-purple-500 hover:bg-purple-400 text-white"
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
