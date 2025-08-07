"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";



export default function Login() {
  async function signInWithFacebook() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    })
    if (error) {
      console.log("error is", error);

    }

    console.log(data);

  }
  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <section className="w-full max-w-sm">
        <Card className="h-fit">
          <CardHeader className="mb-3">
            <CardTitle>Login to your account</CardTitle>
          </CardHeader>
          <CardContent>

            <LoginForm />
            <Button onClick={signInWithFacebook}>faceBook</Button>

          </CardContent>
        </Card>

      </section>
    </section>
  )
}