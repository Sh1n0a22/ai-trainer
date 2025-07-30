// /context/UserContext.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"

const UserContext = createContext<User | null | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
  const supabase = createClient()

  supabase.auth.getSession().then(({ data: { session } }) => {
     console.log("Auth state changed:", session)
    setUser(session?.user ?? null)
  })

 
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
  })

  return () => subscription.unsubscribe()
}, [])

    if (user === undefined ) return null
   
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
