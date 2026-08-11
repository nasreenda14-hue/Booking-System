import { useEffect, useState } from "react";
import API from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function ProviderForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    workers: "",
    image: "",
    services: [],
  });

  const [categories, setCategories] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const cat = await API.get("/categories");
    const ser = await API.get("/service");
    console.log(cat.data.categories);
    console.log(ser.data.services);

    setCategories(cat.data.categories);
    setServicesList(ser.data.services);
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new service row
  const addService = () => {
    setForm({
      ...form,
      services: [...form.services, { service: "", price: "" }],
    });
  };

  // Remove service
  const removeService = (index) => {
    const updated = [...form.services];
    updated.splice(index, 1);
    setForm({ ...form, services: updated });
  };

  // Handle service change
  const handleServiceChange = (index, field, value) => {
    const updated = [...form.services];
    updated[index][field] = value;
    setForm({ ...form, services: updated });
  };

  const handleCategoryChange = async (e) => {
  const categoryId = e.target.value;

  setForm({
    ...form,
    category: categoryId
  });

  try {
    const res = await API.get(
      `/service?category=${categoryId}`
    );

    setServicesList(res.data.services);

  } catch(error){
    console.log(error);
  }
};

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/providers", form);
      alert("Provider Created ✅");
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-4">
          Register Provider
        </h2>

        {/* Name */}
        <input
          name="name"
          placeholder="Provider Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Category */}
       <select
 className="w-full mb-3 p-2 border rounded"
 value={form.category}
 onChange={handleCategoryChange}
>
          <option>Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Location */}
        <input
          name="location"
          placeholder="Location"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Workers */}
        <input
          name="workers"
          type="number"
          placeholder="Workers"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* Image */}
        <input
          name="image"
          placeholder="Image URL"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* SERVICES */}
        <h3 className="font-semibold mt-4 mb-2">
          Services & Prices
        </h3>

        {form.services.map((s, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              className="flex-1 p-2 border rounded"
              onChange={(e) =>
                handleServiceChange(index, "service", e.target.value)
              }
            >
              <option>Select Service</option>
              {servicesList.map((ser) => (
                <option key={ser._id} value={ser._id}>
                  {ser.name}
                  {ser.serviceMode === "home" 
      ? " 🏠 Home" 
      : " 🏢 Visit"}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Price"
              className="w-24 p-2 border rounded"
              onChange={(e) =>
                handleServiceChange(index, "price", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeService(index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addService}
          className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
        >
          + Add Service
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}