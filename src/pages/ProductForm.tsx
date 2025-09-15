import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProductForm(): JSX.Element {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [vendorId, setVendorId] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { user } = useAuth()
  const [vendors, setVendors] = useState<{id:string,name:string}[]>([])

  useEffect(()=>{
    if(user && user.role === 'vendor' && user.vendorId) setVendorId(String(user.vendorId))
    else fetch('/api/vendors').then(r=>r.json()).then(d=>setVendors(d.vendors || d))
  },[user])

  function submit(e: React.FormEvent){
    e.preventDefault(); setLoading(true)
    fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,price:Number(price),vendorId,description})})
      .then(r=>r.json()).then(data=>{ setLoading(false); nav(`/product/${data.product?.id || data.id}`) }).catch(()=>setLoading(false))
  }

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={submit} className="card">
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>Price</label>
        <input value={price} onChange={e=>setPrice(e.target.value)} type="number" />
        <label>Vendor</label>
        {user && user.role === 'vendor' && user.vendorId ? (
          <input value={vendorId} readOnly />
        ) : (
          <select value={vendorId} onChange={e=>setVendorId(e.target.value)}>
            <option value="">Select vendor</option>
            {vendors.map(v=> <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        )}
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </form>
    </div>
  )
}
