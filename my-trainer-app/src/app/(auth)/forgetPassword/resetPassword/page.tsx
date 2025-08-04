"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordClient } from "../../clientActions";
import { changePassword } from "../../actions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
    const handleresetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        changePassword(formData)
        changePasswordClient(formData)

    };

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient()
            const { data } = await supabase.auth.getUser()
            if (data?.user) {
                setIsAuthenticated(true)
            }
            setLoading(false)
        }

        checkUser()
    }, [])

    if (loading) return <p>Loading ...</p>
    if (!isAuthenticated) return <p>invalid or expired link</p>

    return (
        <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <section className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Password was Reset</CardTitle>
                        <form onSubmit={handleresetPassword}>
                            <div className="grid gap-3">
                                <Label htmlFor="email">New password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3 my-4">
                                    <Button type="submit" className="w-full">
                                        Log In 
                                    </Button>
                                </div>
                        </form>
                    </CardHeader>
                </Card>

            </section>
        </section>
    )
}