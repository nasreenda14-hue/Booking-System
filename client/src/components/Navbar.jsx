import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-black">
          Book<span className="text-brown-600">Ease</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/categories" className="hover:text-blue-600">
            Category
          </Link>

          {/* Search */}
          <input
            type="text"
            placeholder="Search services..."
            className="border px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Login */}
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-black">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-gray-700">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/categories" onClick={() => setOpen(false)}>
            Category
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded-full"
          />

          <Link
            to="/login"
            className="bg-red-600 text-white px-4 py-2 rounded-full text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
