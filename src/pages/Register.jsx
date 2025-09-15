import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// export default function Register(){
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { register } = useAuth()
//   const nav = useNavigate()

//   async function submit(e){
//     e.preventDefault(); setLoading(true)
//     try{
//       await register({name, email})
//       nav('/')
//     }catch(e){console.error(e)}finally{setLoading(false)}
//   }

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={submit} className="card">
//         <label>Name</label>
//         <input value={name} onChange={e=>setName(e.target.value)} required />
//         <label>Email</label>
//         <input value={email} onChange={e=>setEmail(e.target.value)} required />
//         <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
//       </form>
//     </div>
//   )
// }


export default function Register(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  function submit(e){
    e.preventDefault(); setLoading(true)
    fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,name})})
      .then(r=>r.json()).then(data=>{
        login(data.user)
        setLoading(false)
        nav('/')
      }).catch(()=>{setLoading(false)})
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit} className="card">
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
    </div>
  )
}
