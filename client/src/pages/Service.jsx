import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/api'

function Service() {
    const {categoryId}=useParams()
    const navigate=useNavigate()

    const [services,setServices]=useState([])
    
    const getServices = async () => {
    try {
      const res = await API.get(
        `/service?category=${categoryId}`
      );
      setServices(res.data.services);
    } catch (err) {
      console.error(err);
    }
  };
    useEffect(()=>{
        getServices();
    },[categoryId])
  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select a Service
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            onClick={() => navigate(`/providers/${service._id}`)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition hover:scale-105 bg-white"
          >
            {/* Image */}
            <img
              src={service.image}
              alt={service.name}
              className="h-40 w-full object-cover"
            />

            {/* Content */}
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>

              {service.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {service.description}
                </p>
              )}

              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Service
