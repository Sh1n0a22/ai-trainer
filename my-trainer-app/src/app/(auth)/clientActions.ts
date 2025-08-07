'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { z } from 'zod';
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "at least 8 characters").max(20)
})

type FormValues = z.infer<typeof formSchema>;

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
export async function loginClient(formData: FormValues) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signInWithPassword({email:data.email, password:data.password})

  if (error) {
    redirect('/error')
  }

  redirect('/')
}

export async function signupClient(formData: FormValues) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  redirect('/')
}

export async function resetPasswordClient(formDataEmail: string) {
    const supabase = await createClient()
    const data = {
        email: formDataEmail
    }
  const {error} = await supabase.auth.resetPasswordForEmail(data.email,{redirectTo:"http://localhost:3000/forgetPassword/resetPassword"})
    if (error) {
      console.log("on client" + error);
      
    }
}

export async function changePasswordClient(formDataPassword:string) {
    const supabase = await createClient()
    const password = formDataPassword
    
     const {error} = await supabase.auth.updateUser({password})
     
    if (error) {
    console.log("client error is:" + error);
    // redirect('/error')
    }
    redirect('/')
}