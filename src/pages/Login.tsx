import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  async function submit(e: React.FormEvent){
    e.preventDefault(); setLoading(true)
    try{ await login(email); nav('/') }catch(e){ console.error(e) }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit} className="card">
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}
