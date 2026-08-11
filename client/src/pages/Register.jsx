import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert(res.data.message || "Registration successful ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {" "}
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-[350px]"
      >
        {" "}
        {/* Heading */}{" "}
        <h2 className="text-2xl font-bold text-center mb-2">
          {" "}
          Create Account ✨{" "}
        </h2>{" "}
        <p className="text-sm text-gray-500 text-center mb-6">
          {" "}
          Create an account to start booking services{" "}
        </p>{" "}
        {/* Name */}{" "}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />{" "}
        {/* Email */}{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />{" "}
        {/* Password */}{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />{" "}
        {/* Confirm Password */}{" "}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />{" "}
        {/* Register Button */}{" "}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 rounded-lg transition duration-200"
        >
          {" "}
          {loading ? "Creating Account..." : "Register"}{" "}
        </button>{" "}
        {/* Login */}{" "}
        <p className="text-sm text-center mt-4">
          {" "}
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 cursor-pointer font-medium"
          >
            {" "}
            Login{" "}
          </span>{" "}
        </p>{" "}
      </form>{" "}
    </div>
  );
};
export default Register;
