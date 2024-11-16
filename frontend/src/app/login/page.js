// 'use client';
// import React from "react";

// function LoginForm() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-[500px] max-md:h-auto">
//         <form className="w-full flex flex-col items-center">
//           <h1 className="text-4xl font-bold text-white text-center">LOGIN</h1>
//           <p className="mt-4 text-sm text-center text-white">
//             New to this site?{" "}
//             <a href="/signup" className="underline hover:text-gray-300">
//               Sign Up
//             </a>
//           </p>
//           <div className="mt-6 w-full">
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
//               required
//             />
//           </div>
//           <div className="mt-4 w-full">
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-4 text-cyan-50 bg-transparent rounded-md text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mt-4 w-full text-right">
//             <a
//               href="/forgot-password"
//               className="text-sm text-white underline hover:text-gray-300"
//             >
//               Forgot password?
//             </a>
//           </div>
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
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter(); // Initialize useRouter

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

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Both fields are required');
      return;
    }

    // Simulate an API call (replace with actual login API)
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Send the formData to backend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        setErrorMessage(''); // Clear any previous error messages
        // Redirect to the home page after successful login
        setTimeout(() => {
          router.push("/TravelPlanner"); // Navigate to home page
        }, 1500); // Redirect after 1.5 seconds
      } else {
        setErrorMessage(data.message || 'Login failed');
        setSuccessMessage(''); // Clear success message on error
      }
    } catch (error) {
      console.error("Login error:", error);  // Log the error
      setErrorMessage('An error occurred during login');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-[500px] max-md:h-auto">
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-white text-center">LOGIN</h1>
          <p className="mt-4 text-sm text-center text-white">
            New to this site?{" "}
            <a href="/signup" className="underline hover:text-gray-300">
              Sign Up
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
              className="w-full px-4 py-4 text-cyan-50 bg-transparent rounded-md text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
              required
            />
          </div>
          <div className="mt-4 w-full text-right">
            <a
              href="/forgot-password"
              className="text-sm text-white underline hover:text-gray-300"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            LOGIN
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginForm;
