import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Easy Book
            </h1>

            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">
                Administrator
              </p>

              <p className="text-xs text-gray-400">Admin</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
