'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {z} from 'zod';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "at least 8 characters").max(20)
})

type FormValues = z.infer<typeof formSchema>;

export async function login(formData: FormValues) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password
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

export async function signup(formData: FormValues) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
export async function resetPassword(formData: FormValues) {
  const supabase = await createClient()
  const data = {
    email: formData.email,
    password: formData.password
  }
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, { redirectTo: "http://localhost:3000/forgetPassword/resetPassword" })
  if (error) {
    console.log("on server" + error);

  }
}
export async function changePassword(formDataPassword: string) {
  const supabase = await createClient()
  const data = {
    password: formDataPassword
  }
  const { error } = await supabase.auth.updateUser({ password: data.password })
  if (error) {
    console.log("server error is:" + error);
    // redirect('/error')
  }
  redirect('/')
}