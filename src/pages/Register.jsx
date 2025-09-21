import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register(){
  
  const [fName, setfName] = useState('')
  const [lName, setlName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setpass] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  function submit(e){
    e.preventDefault(); 
    setLoading(true)
    const url = '/api/v1/register'
    const header = {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({fName, lName, email, pass})
    }
    fetch(url, header)
      .then(r=>r.json())
      .then(data=>{
        console.log(data,'data');
        login(data.user)
        setLoading(false)
        nav('/')
      }
    ).catch(()=>{setLoading(false)})
  }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={submit} className="card">

        <label>First Name</label>
        <input value={fName} onChange={e=>setfName(e.target.value)} placeholder="First name" />

        <label>Last Name</label>
        <input value={lName} onChange={e=>setlName(e.target.value)} placeholder="Last name" />

        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="xxxx@example.com" />

        <label>password</label>
        <input value={pass} onChange={e=>setpass(e.target.value)} placeholder="password" />

        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        
      </form>
    </div>
  )
}
