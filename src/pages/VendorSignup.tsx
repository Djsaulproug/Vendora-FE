import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function VendorSignup(): JSX.Element {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { user, promoteToVendor, register } = useAuth()

  async function submit(e: React.FormEvent){
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch('/api/vendors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})})
      const data = await res.json()
      const vid = data.vendor?.id || data.id
      if(!user){
        await register({ name: 'Vendor Owner', email: `vendor${vid}@example.com` })
        promoteToVendor(vid)
      } else {
        promoteToVendor(vid)
      }
      nav(`/vendor/${vid}`)
    } catch {
      // error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Vendor Signup</h2>
      <form onSubmit={submit} className="card">
        <label>Vendor name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your vendor name" />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Vendor'}</button>
      </form>
    </div>
  )
}
