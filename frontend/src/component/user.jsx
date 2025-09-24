import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (status || error) {
      const timer = setTimeout(() => {
        setStatus("");
        setError("");
      }, 5000); // hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [status, error]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        }),
      });
      const response = await data.json();

      if (!data.ok) {
        setError(response.error);
        setUser({
          name: "",
          email: "",
          password: "",
          role: "USER",
        });
      }

      setStatus(response.message);
      setUser({
        name: "",
        email: "",
        password: "",
        role: "USER",
      });
    } catch (err) {
      setError(`${err.message}, Check your internet connection.`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4">
      {/* Optional Decorative Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>

      {/* Signup Card */}
      <div className="relative w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 z-10">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-yellow-300">
            <Link to="/">SwiftPay</Link>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Secure Digital Payments</p>
        </div>

        {/* Messages */}
        {status ? (
          <p className="mb-4 text-sm text-green-600 font-medium">{status}</p>
        ) : error ? (
          <p className="mb-4 text-sm text-red-600 font-medium">{error}</p>
        ) : null}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs... */}
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300 hover:shadow-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300 hover:shadow-md"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter a strong password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300 hover:shadow-md"
            />
          </div>

          {/* Role */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Register as
            </p>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={user.role === "USER"}
                  onChange={handleChange}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span>User</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="MERCHANT"
                  checked={user.role === "MERCHANT"}
                  onChange={handleChange}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span>Merchant</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <ClipLoader
                  color={color}
                  loading={load}
                  // cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <span className="ml-2">creating.....</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Route */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline transition"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
