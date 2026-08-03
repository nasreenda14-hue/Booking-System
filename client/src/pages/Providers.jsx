import { useParams } from "react-router-dom";
import { providers } from "../data/Providers";

export default function Providers() {
  const { category } = useParams();

  const filtered = providers.filter(
    (item) => item.category === category
  );

  return (
    <div className="p-6">
      
     
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category} Services
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-500 text-sm">
                📍 {item.location}
              </p>

              <p className="text-yellow-500 text-sm">
                ⭐ {item.rating}
              </p>

              <p className="text-blue-600 font-bold mt-1">
                ${item.price}
              </p>

              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Book Now
              </button>
              
            </div>
          </div>
        ))}
      </div>
        
    </div>
  );
}