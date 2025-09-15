import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RequireAuth({ children, vendorOnly }){
  const { user } = useAuth()
  const loc = useLocation()
  if(!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if(vendorOnly && user.role !== 'vendor') return <div className="card">Access denied — vendor only</div>
  return children
}
