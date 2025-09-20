import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Welcome to <span className="text-yellow-300">SwiftPay</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0 opacity-90">
              Your number 1{" "}
              <span className="font-semibold">digital payment method</span> —
              fast, secure, and trusted by thousands of users.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-400 transition">
                <Link to="/signup"> Get Started</Link>
              </button>
              <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Signup/Login Card */}
          <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto lg:mx-0">
            {/* Tabs */}
            <div className="flex justify-around border-b border-gray-200 mb-6">
              <Link
                to="/login"
                className="w-1/2 text-center py-2 font-semibold text-indigo-600 border-b-2 border-indigo-600"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="w-1/2 text-center py-2 font-semibold text-gray-500 hover:text-indigo-600 transition"
              >
                Sign Up
              </Link>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <button
                type="text"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                <Link to="/login" className=" font-semibold">
                  Continue
                </Link>
              </button>
            </div>

            {/* Extra Links */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
