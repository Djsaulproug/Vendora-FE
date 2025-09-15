import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function VendorDashboard(){
  const { vendorId } = useParams()
  const [vendor, setVendor] = useState(null)
  const [products, setProducts] = useState([])
  const { user } = useAuth()
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(()=>{
    fetch(`/api/vendors/${vendorId}`).then(r=>r.json()).then(data=>setVendor(data.vendor || data))
    fetch(`/api/products?vendorId=${vendorId}`).then(r=>r.json()).then(data=>setProducts(data.products || data))
  },[vendorId])

  if(!vendor) return <div>Loading vendor...</div>

  return (
    <div>
      <h2>{vendor.name} — Dashboard</h2>
      <p>Products</p>
      {user && user.role === 'vendor' && String(user.vendorId) === String(vendorId) && (
        <div className="card" style={{marginBottom:12}}>
          <h4>Create product</h4>
          <input placeholder="Name" value={newName} onChange={e=>setNewName(e.target.value)} />
          <input placeholder="Price" type="number" value={newPrice} onChange={e=>setNewPrice(e.target.value)} />
          <button onClick={async ()=>{
            setCreating(true)
            const payload = { name: newName, price: Number(newPrice), vendorId }
            const res = await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
            const data = await res.json()
            setProducts(prev=>[...(data.product ? [data.product] : [data]), ...prev])
            setNewName(''); setNewPrice(''); setCreating(false)
          }} disabled={creating || !newName}>Create</button>
        </div>
      )}
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="product-name">{p.name}</div>
            <div className="price">${p.price}</div>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
