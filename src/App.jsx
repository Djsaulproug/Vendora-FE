import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import VendorDashboard from './pages/VendorDashboard'
import ProductPage from './pages/ProductPage'
import VendorSignup from './pages/VendorSignup'
import ProductForm from './pages/ProductForm'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">Vendora</Link>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/vendor/1">Vendor Dashboard (demo)</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendor/:vendorId" element={<VendorDashboard />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendor-signup" element={<VendorSignup />} />
          <Route path="/product/new" element={<ProductForm />} />
        </Routes>
      </main>

      <footer className="footer">Vendora Demo — MirageJS fake API</footer>
    </div>
  )
}
