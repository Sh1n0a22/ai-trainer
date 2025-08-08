"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { signInWithFacebookClient } from "../clientActions";



export default function Login() {

  return(  
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <section className="w-full max-w-sm">
        <Card className="h-fit">
          <CardHeader className="my-3">
            <CardTitle>Login to your account</CardTitle>
          </CardHeader>
          <CardContent>

            <LoginForm />
            
            <hr />
            <Button variant="outline" className="w-full mt-8" onClick={signInWithFacebookClient}>Continue with faceBook</Button>

          </CardContent>
        </Card>

      </section>
    </section>
  )
}