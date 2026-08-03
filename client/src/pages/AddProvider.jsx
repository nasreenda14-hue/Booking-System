// pages/AddProvider.jsx

import { useState } from "react";

 export default function AddProvider() {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     location: "",
//     price: "",
//     image: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form); // later send to backend
//   };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Add Your Business</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Business Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="salon">Salon</option>
          <option value="barber">Barber</option>
          <option value="photography">Photography</option>
          <option value="consultant">Consultant</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  );
}