import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Categories() {
  const navigate = useNavigate();
  const [categories,setCategories]=useState([])

  useEffect(()=>{
    API.get("/categories")
    .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
},[])

  return (
    <div className="text-center my-8">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
    Find & Book Trusted Services
  </h1>
  <p className="text-gray-500 mt-2">
    Browse through our wide range of professional services 
    and book the one that fits your needs.
  </p>

    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <div
          key={cat._id}
          onClick={() => navigate(`/services/${cat._id}`)}
          className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition hover:scale-105"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={cat.image}
              alt={cat.name}
              className="h-40 w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-lg font-semibold">
                {cat.name}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}