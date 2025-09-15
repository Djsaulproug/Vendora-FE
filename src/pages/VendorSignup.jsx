import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function VendorSignup(){
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { user, promoteToVendor, register } = useAuth()

  function submit(e){
    e.preventDefault(); setLoading(true)
    fetch('/api/vendors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})})
      .then(r=>r.json()).then(async (data)=>{
        setLoading(false)
        const vid = data.vendor?.id || data.id
        // if not logged in, create a demo account then promote
        if(!user){
          const demo = await register({ name: 'Vendor Owner', email: `vendor${vid}@example.com` })
          promoteToVendor(vid)
        } else {
          promoteToVendor(vid)
        }
        nav(`/vendor/${vid}`)
      }).catch(()=>setLoading(false))
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
