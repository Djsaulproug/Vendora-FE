import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    fetch(`/api/products/${id}`).then(r=>r.json()).then(data=>setProduct(data.product || data))
  },[id])

  function buy(){
    setStatus('Placing order...')
    fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId:id,quantity:1})})
      .then(r=>r.json()).then(o=>setStatus(`Order ${o.order?.id || o.id} created`)).catch(()=>setStatus('Order failed'))
  }

  if(!product) return <div>Loading product...</div>

  return (
    <div>
      <h2>{product.name}</h2>
      <div className="card">
        <div className="price">${product.price}</div>
        <p>{product.description}</p>
        <button onClick={buy}>Buy (demo)</button>
        <div style={{marginTop:8}}>{status}</div>
      </div>
    </div>
  )
}
