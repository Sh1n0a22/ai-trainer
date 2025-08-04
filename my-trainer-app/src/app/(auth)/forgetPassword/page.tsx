"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "../actions";
import { resetPasswordClient } from "../clientActions";
import { redirect } from "next/navigation";

export default function ForgetPassword() {
    const handleresetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        resetPasswordClient(formData)
    };

    return (
        <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <section className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Reset your new password</CardTitle>
                        <CardDescription>
                            Enter your email to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleresetPassword}>
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
                                
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        reset password
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </CardContent>
                </Card>

            </section>
        </section>
    )
}