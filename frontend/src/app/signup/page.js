'use client';
import React, { useState } from "react";
import Image from "next/image";
import bg from "../media/japan-background-digital-art_23-2151546140.png";

function SignUpPage() {
  // State to hold form data, matching the backend field names
  const [formData, setFormData] = useState({
    Name: "",        // Updated to match backend's expected field
    username: "",    // Added username field
    email: "",
    phone: "",       // phone instead of mobile
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
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
        body: JSON.stringify(formData),  // Send the updated formData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("User created successfully!");
        setErrorMessage(""); // Clear any previous error messages
        // Optionally, redirect the user to the login page after successful signup
        // window.location.href = "/login"; 
      } else {
        console.log("Error response data:", data);  // Log the error response data
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage(""); // Clear success message on error
      }
    } catch (error) {
      console.error("Error details:", error);  // Log the error details for better insight
      setErrorMessage("An error occurred while signing up");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="flex items-center justify-between px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-4xl w-full h-auto">
        {/* Left Image Section */}
        <div className="hidden lg:block w-1/2">
          <Image
            src={bg} // Adjusted the path
            alt="Sign Up Illustration"
            className="w-96 h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col w-full lg:w-1/2">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-white text-center">Sign Up</h1>
            <p className="mt-4 text-sm text-center text-white">
              Already a member?{" "}
              <a href="/login" className="underline hover:text-gray-300">
                Log In
              </a>
            </p>

            {/* Error or Success Message */}
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm text-center">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="mt-4 text-green-500 text-sm text-center">{successMessage}</div>
            )}

            <div className="mt-6 w-full">
              <input
                id="Name"
                name="Name"
                type="text"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4 w-full">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4 w-full">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4 w-full">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
                required
              />
            </div>

            <div className="mt-4 w-full">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;

