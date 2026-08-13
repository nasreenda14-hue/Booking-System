import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Categories from "./pages/Categories.jsx";
import Services from "./pages/Services.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<AdminDashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;
