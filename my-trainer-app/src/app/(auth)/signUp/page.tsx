"use client"
import { Input } from "@/components/ui/input";
import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signupClient } from "../clientActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
export default function SignUp() {
    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        signup(formData);
        signupClient(formData)
      };
    
    return (
         <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <section className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create your new account</CardTitle>
            <CardDescription>
              Enter your email below to create new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="hover:underline underline-offset-4">
                    Login
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

      </section>
    </section>
    )
}