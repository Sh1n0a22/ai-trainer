// utils/supabase/logoutClient.ts
'use client'


import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"


export async function logoutClient() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Logout failed:", error)
    throw error
  }

  // You can redirect manually if needed
  window.location.href = '/login'
}
export async function loginClient(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  console.log("error is " + error)
  if (error) {
    redirect('/error')
  }

  redirect('/')
}

export async function signupClient(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  redirect('/')
}

export async function resetPasswordClient(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string
    }
  const {error} = await supabase.auth.resetPasswordForEmail(data.email,{redirectTo:"http://localhost:3000/forgetPassword/resetPassword"})
    if (error) {
      console.log("on client" + error);
      
    }
}

export async function changePasswordClient(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string
    
     const {error} = await supabase.auth.updateUser({password})
    if (error) {
    console.log("client error is:" + error);
    // redirect('/error')
    }
    redirect('/')
}