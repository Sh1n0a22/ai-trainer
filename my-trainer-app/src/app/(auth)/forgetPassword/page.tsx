"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/components/ResetPasswordForm";


export default function ForgetPassword() {
   
    return (
        <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <section className="w-full max-w-sm">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Reset your new password</CardTitle>
                        <CardDescription>
                            Enter your email to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResetPasswordForm />
                    </CardContent>
                </Card>

            </section>
        </section>
    )
}