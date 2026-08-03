import React from 'react'
import Navbar from './components/Navbar'
import Providers from './pages/Providers'
import Categories from './components/Categories'
import { Route, Routes } from 'react-router-dom'
import AddProvider from './pages/AddProvider'

function App() {
  return (
    <div>
      <Navbar />
       <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/providers/:category" element={<Providers />} />
      <Route path="/add-provider" element={<AddProvider />} />
    </Routes>
    </div>
  )
}

export default App
