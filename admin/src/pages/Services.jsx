import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Services = () => {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    serviceMode: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete popup
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // =========================
  // GET CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.categories || []);

    } catch (error) {
      console.error(
        "Error fetching categories:",
        error
      );
    }
  };

  // =========================
  // GET SERVICES
  // =========================

 const fetchServices = async () => {
  try {
    setLoading(true);

    const res = await API.get("/service");

    console.log("ADMIN SERVICES:", res.data);

    setServices(res.data.services || []);

  } catch (error) {
    console.error(
      "ADMIN SERVICES ERROR:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE / UPDATE SERVICE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.category ||
      !form.serviceMode
    ) {
      alert(
        "Name, category and service mode are required"
      );

      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        // UPDATE

        await API.put(
          `/service/${editingId}`,
          form
        );

        alert("Service updated successfully");

      } else {
        // CREATE

        await API.post(
          "/service/create",
          form
        );

        alert("Service created successfully");
      }

      // Reset

      setForm({
        name: "",
        category: "",
        description: "",
        image: "",
        serviceMode: "",
      });

      setEditingId(null);

      fetchServices();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (service) => {
    setEditingId(service._id);

    setForm({
      name: service.name || "",
      category:
        service.category?._id ||
        service.category ||
        "",
      description:
        service.description || "",
      image: service.image || "",
      serviceMode:
        service.serviceMode || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await API.delete(
        `/service/${deleteId}`
      );

      alert("Service deleted successfully");

      setShowDeleteModal(false);
      setDeleteId(null);

      fetchServices();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete service"
      );
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      category: "",
      description: "",
      image: "",
      serviceMode: "",
    });
  };

  // =========================
  // GET CATEGORY NAME
  // =========================

  const getCategoryName = (category) => {
    if (!category) return "Unknown";

    // If backend populated category
    if (typeof category === "object") {
      return category.name || "Unknown";
    }

    // If category is only ObjectId
    const foundCategory = categories.find(
      (cat) => cat._id === category
    );

    return foundCategory?.name || "Unknown";
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =========================
          HEADER
      ========================= */}

      <header className="bg-white border-b sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="h-16 flex items-center justify-between">

            <div>

              <h1 className="text-xl font-bold text-gray-800">
                Easy Book
              </h1>

              <p className="text-xs text-gray-400">
                Service Management
              </p>

            </div>

            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700"
            >
              ← Dashboard
            </button>

          </div>

        </div>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* PAGE TITLE */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Services
          </h2>

          <p className="text-gray-500 mt-1">
            Create and manage services offered on
            Easy Book.
          </p>

        </div>

        {/* =========================
            SERVICE FORM
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

          <h3 className="text-xl font-bold text-gray-800 mb-5">

            {editingId
              ? "Edit Service"
              : "Add New Service"}

          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* NAME */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Haircut"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (

                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>

            {/* SERVICE MODE */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Mode
              </label>

              <select
                name="serviceMode"
                value={form.serviceMode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Service Mode
                </option>

                <option value="Home">
                  Home
                </option>

                <option value="Visit">
                  Visit
                </option>

              </select>

            </div>

            {/* IMAGE */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the service..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl font-semibold transition"
              >

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Add Service"}

              </button>

              {editingId && (

                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>

        {/* =========================
            SERVICE TABLE
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b">

            <h3 className="text-xl font-bold text-gray-800">
              All Services
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {services.length} services found
            </p>

          </div>

          {loading ? (

            <div className="p-8 text-center text-gray-500">
              Loading services...
            </div>

          ) : services.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No services found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Image
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Service
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Mode
                    </th>

                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {services.map((service) => (

                    <tr
                      key={service._id}
                      className="hover:bg-gray-50"
                    >

                      {/* IMAGE */}

                      <td className="px-6 py-4">

                        <img
                          src={
                            service.image ||
                            "https://via.placeholder.com/80"
                          }
                          alt={service.name}
                          className="w-14 h-14 object-cover rounded-xl"
                        />

                      </td>

                      {/* SERVICE */}

                      <td className="px-6 py-4">

                        <p className="font-semibold text-gray-800">
                          {service.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          {service.description ||
                            "No description"}
                        </p>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-4">

                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                          {getCategoryName(
                            service.category
                          )}
                        </span>

                      </td>

                      {/* MODE */}

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            service.serviceMode ===
                            "Home"
                              ? "bg-green-50 text-green-600"
                              : "bg-purple-50 text-purple-600"
                          }`}
                        >
                          {service.serviceMode}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              handleEdit(service)
                            }
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              openDeleteModal(
                                service._id
                              )
                            }
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* =========================
          DELETE CONFIRMATION MODAL
      ========================= */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            {/* ICON */}

            <div className="flex justify-center mb-4">

              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

                <span className="text-2xl">
                  🗑️
                </span>

              </div>

            </div>

            {/* TITLE */}

            <h3 className="text-xl font-bold text-gray-800 text-center">
              Delete Service?
            </h3>

            {/* MESSAGE */}

            <p className="text-gray-500 text-center mt-2">
              Are you sure you want to delete
              this service? This action cannot
              be undone.
            </p>

            {/* BUTTONS */}

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Services;

