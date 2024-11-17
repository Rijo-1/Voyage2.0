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
      className={`flex items-center justify-center min-h-screen gradient-background ${
        isDarkMode ? "bg-gray-900" : ""
      }`}
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



