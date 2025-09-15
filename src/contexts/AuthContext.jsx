import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    try{
      return JSON.parse(localStorage.getItem('vendora_user'))
    }catch(e){return null}
  })

  useEffect(()=>{
    if(user) localStorage.setItem('vendora_user', JSON.stringify(user))
    else localStorage.removeItem('vendora_user')
  },[user])

  async function login(email){
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
    const data = await res.json()
    setUser(data.user)
    return data
  }

  async function register(attrs){
    const res = await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(attrs)})
    const data = await res.json()
    // attach role if provided by backend
    setUser(data.user)
    return data
  }

  function logout(){
    setUser(null)
  }

  // Mark current user as vendor (local promotion for demo)
  function promoteToVendor(vendorId){
    setUser(prev => ({...prev, role: 'vendor', vendorId}))
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout, promoteToVendor}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}

