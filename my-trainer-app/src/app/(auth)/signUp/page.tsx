"use client"
import { Input } from "@/components/ui/input";
import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { signupClient } from "../clientActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SignUpForm from "@/components/SignUpForm";
export default function SignUp() {

  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <section className="w-full max-w-sm">
        <Card className="h-fit">
          <CardHeader className="mb-3">
            <CardTitle >Create your new account</CardTitle>
          </CardHeader>
          <CardContent>

            <SignUpForm />
          </CardContent>
        </Card>

      </section>
    </section>
  )
}