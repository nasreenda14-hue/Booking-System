import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/login", form);

      if (res.data.role !== "admin") {
        alert("Access denied. Admin login required.");
        return;
      }

      // Save authentication
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Login Card */}

      <div className="w-full max-w-md">
        {/* Logo / Brand */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Easy Book</h1>

          <p className="text-slate-400 mt-1">Administration Panel</p>
        </div>

        {/* Form Card */}

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Heading */}

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>

            <p className="text-gray-500 text-sm mt-1">
              Sign in to manage your platform
            </p>
          </div>

          {/* Email */}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Password */}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-3.5 rounded-xl font-semibold transition duration-200 shadow-lg shadow-red-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login to Dashboard"
            )}
          </button>

          {/* Security message */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>🔒</span>

            <span>Admin access only</span>
          </div>
        </form>

        {/* Footer */}

        <p className="text-center text-slate-500 text-xs mt-6">
          © 2026 Easy Book. Admin Panel.
        </p>
      </div>
    </div>
  );
};

export default Login;
