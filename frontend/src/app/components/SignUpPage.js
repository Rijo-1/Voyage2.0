import React from "react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-auto max-md:h-auto">
        <form className="w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white text-center">Sign Up</h1>
          <p className="mt-4 text-sm text-center text-white">
            Already a member?{" "}
            <a href="/login" className="underline hover:text-gray-300">
              Log In
            </a>
          </p>
          <div className="mt-6 w-full">
            <input
              id="first-name"
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
              required
            />
          </div>

          <div className="mt-4 w-full">
            <input
              id="last-name"
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
              required
            />
          </div>

          <div className="mt-4 w-full">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:outline-none border-b-2 border-slate-50 focus:ring-0"
              required
            />
          </div>

          <div className="mt-4 w-full">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
              required
            />
          </div>
          <div className="mt-4 w-full">
            <input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-4 rounded-md bg-transparent text-cyan-50 text-md focus:ring-0 border-b-2 border-slate-50 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col items-start mt-6 w-full max-md:mt-4">
            <label className="flex items-center text-white text-md max-md:text-sm">
              <input type="checkbox" className="mr-2" />
              I agree to the code of conduct
            </label>
            <label className="flex items-center text-white text-md mt-2 max-md:text-sm">
              <input type="checkbox" className="mr-2" />
              Join the community
            </label>
          </div>
          <button
            type="submit"
            className="w-64 px-4 py-2 mt-6 text-black bg-white rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignUpPage;
