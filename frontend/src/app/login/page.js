import React from "react";

function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="flex items-center justify-center px-6 py-10 bg-slate-500 rounded-xl shadow-lg max-w-md w-full h-[500px] max-md:h-auto">
        <form className="w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white text-center">LOGIN</h1>
          <p className="mt-4 text-sm text-center text-white">
            New to this site?{" "}
            <a href="/signup" className="underline hover:text-gray-300">
              Sign Up
            </a>
          </p>
          <div className="mt-6 w-full">
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
