'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
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

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {

  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')

}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }
  const {error} = await supabase.auth.resetPasswordForEmail(data.email,{redirectTo:"http://localhost:3000/forgetPassword/resetPassword"})
    if (error) {
      console.log("on server" +error);
      
    }
}
export async function changePassword(formData: FormData) {
    const supabase = await createClient()
    const data = {
        password: formData.get('password') as string
    }
    const {error} = await supabase.auth.updateUser({password:data.password})
    if (error) {
    console.log("server error is:" + error);
    // redirect('/error')
    }
    redirect('/')
}