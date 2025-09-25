import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");

  useEffect(() => {
    if (status || error || message) {
      const timer = setTimeout(() => {
        setStatus("");
        setError("");
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, error, message]);

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
      const data = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const response = await data.json();
      localStorage.setItem("token", response.token);
      if (response.role === "USER") navigate("/user");
      else if (response.role === "MERCHANT") navigate("/merchant");

      if (!data.ok) {
        setError(response.error);
        setUser({
          email: "",
          password: "",
        });
      }

      setStatus(response.message);
      setUser({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("server error", err);
      setError(`${err}, Checking your network connection.`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="../swiftpay-wordmark.svg"
            alt="SwiftPay"
            className="w-48 sm:w-56 md:w-64 h-auto mx-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {message && (
            <p className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded-md">
              {message}
            </p>
          )}

          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-yellow-400">
            <Link to="/">SwiftPay</Link>
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Secure Digital Payments
          </p>

          {/* Status Messages */}
          {status ? (
            <p className="mb-4 text-sm text-green-600 font-medium text-center">
              {status}
            </p>
          ) : error ? (
            <p className="mb-4 text-sm text-red-600 font-medium text-center">
              {error}
            </p>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ClipLoader
                    color={color}
                    loading={load}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Login...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Links */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
