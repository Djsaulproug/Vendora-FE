import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id?: string
  name?: string
  email?: string
  role?: string
  vendorId?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string) => Promise<any>
  register: (attrs: {name?: string, email: string}) => Promise<any>
  logout: () => void
  promoteToVendor: (vendorId: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }){
  const [user, setUser] = useState<User | null>(()=>{
    try{ return JSON.parse(localStorage.getItem('vendora_user') || 'null') }catch(e){return null}
  })

  useEffect(()=>{
    if(user) localStorage.setItem('vendora_user', JSON.stringify(user))
    else localStorage.removeItem('vendora_user')
  },[user])

  async function login(email: string){
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
    const data = await res.json()
    setUser(data.user)
    return data
  }

  async function register(attrs: {name?: string, email: string}){
    const res = await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(attrs)})
    const data = await res.json()
    setUser(data.user)
    return data
  }

  function logout(){ setUser(null) }

  function promoteToVendor(vendorId: string){ setUser(prev => prev ? ({...prev, role:'vendor', vendorId}) : null) }

  return (
    <AuthContext.Provider value={{user, login, register, logout, promoteToVendor}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
