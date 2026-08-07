import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Providers() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, [serviceId]);

  const fetchProviders = async () => {
    try {
      const res = await API.get(`/providers?service=${serviceId}`);
      setProviders(res.data.providers || []);
    } catch (err) {
      console.error("Error fetching providers:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6 py-10">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Choose Your Provider
      </h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-60 bg-gray-300 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* No Data */}
      {!loading && providers.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No providers available 😢
        </p>
      )}

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading &&
          providers.map((provider) => {
            const serviceData = provider.services?.find(
              (s) => (s.service?._id || s.service)?.toString() === serviceId,
            );
            return (
              <div
                key={provider._id}
                
                className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <img
                  src={
                    provider.image ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={provider.name}
                  className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow">
                  ⭐ 4.5
                </div>

                {/* Content */}
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-white text-lg font-bold tracking-wide">
                    {provider.name}
                  </h3>

                  <p className="text-gray-200 text-sm mt-1">
                    📍 {provider.location || "Unknown"}
                  </p>

                  <p className="text-green-400 font-semibold">
                    ₹{serviceData ? serviceData.price : "N/A"}
                  </p>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-green-400 text-sm font-medium">
                      ● Available
                    </span>

                    <span className="bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-semibold shadow" 
            onClick={() =>
  navigate(`/booking/${provider._id}/${serviceId}`)
}>
                      Book Now
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
