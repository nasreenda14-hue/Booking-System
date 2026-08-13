import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.image.trim()) {
      alert("Category name and image are required");
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        // UPDATE
        await API.put(`/categories/${editingId}`, form);

        alert("Category updated successfully");
      } else {
        await API.post("/categories", form);

        alert("Category created successfully");
      }

      setForm({
        name: "",
        image: "",
      });

      setEditingId(null);

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name,
      image: category.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await API.delete(`/categories/${deleteId}`);

      alert("Category deleted successfully");

      setShowDeleteModal(false);
      setDeleteId(null);

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete category");
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Easy Book</h1>

              <p className="text-xs text-gray-400">Category Management</p>
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

      {/* Main */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page heading */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>

          <p className="text-gray-500 mt-1">
            Create and manage Easy Book service categories.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-5">
            {editingId ? "Edit Category" : "Add New Category"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Name */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Beauty"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image */}

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

            {/* Buttons */}

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Add Category"}
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">All Categories</h3>

            <p className="text-sm text-gray-500 mt-1">
              {categories.length} categories found
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No categories found.
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
                      Name
                    </th>

                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      {/* Image */}

                      <td className="px-6 py-4">
                        <img
                          src={
                            category.image || "https://via.placeholder.com/80"
                          }
                          alt={category.name}
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                      </td>

                      {/* Name */}

                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">
                          {category.name}
                        </p>
                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(category._id);
                              setShowDeleteModal(true);
                            }}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold"
                          >
                            Delete
                          </button>
                          {showDeleteModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
                                {/* Icon */}

                                <div className="flex justify-center mb-4">
                                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-2xl">🗑️</span>
                                  </div>
                                </div>

                                {/* Title */}

                                <h3 className="text-xl font-bold text-gray-800 text-center">
                                  Delete Category?
                                </h3>

                                {/* Message */}

                                <p className="text-gray-500 text-center mt-2">
                                  Are you sure you want to delete this category?
                                  This action cannot be undone.
                                </p>

                                {/* Buttons */}

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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Categories;
