import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from || "/";
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
      const res = await axios.post("http://localhost:5000/api/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      //  Redirect by role
      if (res.data.role === "admin") navigate("/");
      else if (res.data.role === "provider") navigate("/add-provider");
      else navigate(from);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back 👋</h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue booking services
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
