import React from 'react'
import Navbar from './components/Navbar'
import Providers from './pages/Providers'
import Categories from './components/Categories'
import { Route, Routes } from 'react-router-dom'
import Service from './pages/Service'
import ProviderForm from './provider/ProviderForm'
import BookingForm from './components/BookingForm'

function App() {
  return (
    <div>
      <Navbar />
       <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/services/:categoryId" element={<Service/>} />
      <Route path="/providers/:serviceId" element={<Providers />} />
      <Route path="/add-provider" element={<ProviderForm />} />
      <Route path="/booking/:providerId/:serviceId" element={<BookingForm />} />
    </Routes>
    </div>
  )
}

export default App
