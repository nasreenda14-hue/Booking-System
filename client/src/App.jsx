import React from 'react'
import Navbar from './components/Navbar'
import Providers from './pages/Providers'
import Categories from './components/Categories'
import { Route, Routes } from 'react-router-dom'
import Service from './pages/Service'
import ProviderForm from './provider/ProviderForm'
import BookingForm from './pages/BookingForm'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import RoleRoute from './routes/RoleRoute.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import Payment from "./pages/Payment.jsx";

function App() {
  return (
    <div>
      <Navbar />
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/" element={<Categories />} />
      <Route path="/services/:categoryId" element={<Service/>} />
      <Route path="/providers/:serviceId" element={<Providers />} />
      
      <Route path="/add-provider" element={
            <RoleRoute allowedRoles={["provider", "admin"]}>
              <ProviderForm />
            </RoleRoute>
          } />
      <Route path="/booking/:providerId/:serviceId" element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          } />
           <Route path="/payment/:bookingId" element={<Payment />}/>
    </Routes>
   
    </div>
  )
}

export default App
