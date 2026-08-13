import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api.js";

import Navbar from "../components/Navbar.jsx";
import StatCard from "../components/StatCard.jsx";
import ManagementCard from "../components/ManagementCard.jsx";
import RecentServices from "../components/RecentServices.jsx";

const Home = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [recentServices, setRecentServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [categoryRes, serviceRes, recentRes] = await Promise.all([
        API.get("/categories"),
        API.get("/service"),
        API.get("/service/recent"),
      ]);

      // All categories
      setCategories(categoryRes.data.categories || []);

      // ALL services
      setServices(serviceRes.data.services || []);

      // ONLY latest 5 services
      setRecentServices(recentRes.data.services || []);
    } catch (error) {
      console.error("Dashboard error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // Count ALL services
  const homeServices = services.filter(
    (service) => service.serviceMode === "Home",
  ).length;

  const visitServices = services.filter(
    (service) => service.serviceMode === "Visit",
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

          <p className="text-gray-500 mt-1">Manage your Easy Book platform</p>
        </div>

        {/* Statistics */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 bg-white rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Categories"
              value={categories.length}
              icon="📂"
              iconBg="bg-blue-100"
            />

            <StatCard
              title="Total Services"
              value={services.length}
              icon="🛠️"
              iconBg="bg-green-100"
            />

            <StatCard
              title="Home Services"
              value={homeServices}
              icon="🏠"
              iconBg="bg-orange-100"
            />

            <StatCard
              title="Visit Services"
              value={visitServices}
              icon="🏢"
              iconBg="bg-purple-100"
            />
          </div>
        )}

        {/* Management */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ManagementCard
              icon="📂"
              iconBg="bg-blue-100"
              title="Categories"
              description="Add, edit and delete service categories."
              buttonText="Manage Categories"
              buttonColor="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/categories")}
            />

            <ManagementCard
              icon="🛠️"
              iconBg="bg-green-100"
              title="Services"
              description="Add, edit and delete services and set Home or Visit mode."
              buttonText="Manage Services"
              buttonColor="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/services")}
            />
          </div>
        </div>

        {/* Recent Services */}
        <RecentServices services={recentServices} />
      </main>
    </div>
  );
};

export default Home;
