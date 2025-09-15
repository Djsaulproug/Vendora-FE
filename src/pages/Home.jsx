import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function VendorList() {
  const [vendors, setVendors] = useState([])
  useEffect(() => {
    fetch('/api/vendors').then(r => r.json()).then(data => setVendors(data.vendors || data))
  }, [])

  return (
    <div className="card">
      <h3>Vendors</h3>
      <ul>
        {vendors.map(v => (
          <li key={v.id}><Link to={`/vendor/${v.id}`}>{v.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

function ProductCard({ p }){
  return (
    <div className="card">
      <div className="product-name">{p.name}</div>
      <div className="price">${p.price}</div>
      <p>{p.description}</p>
      <Link to={`/product/${p.id}`}>View</Link>
    </div>
  )
}

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    fetch('/api/products').then(r=>r.json()).then(data=>setProducts(data.products || data))
  },[])

  return (
    <div>
      <h1>Welcome to Vendora (Demo)</h1>
      <div style={{marginBottom:12}}>
        <Link to="/vendor-signup" style={{marginRight:12}}>Create a Vendor</Link>
        <Link to="/product/new">Create a Product (demo)</Link>
      </div>
      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{width:280}}><VendorList/></div>
        <div style={{flex:1}}>
          <h3>Featured Products</h3>
          <div className="grid">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
