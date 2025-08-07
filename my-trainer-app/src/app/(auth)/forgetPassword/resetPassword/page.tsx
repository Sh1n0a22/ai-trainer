"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordClient } from "../../clientActions";
import { changePassword } from "../../actions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import SetNewPasswordForm from "@/components/SetNewPasswordForm";

export default function ResetPassword() {


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
                        <CardTitle>Write your new password</CardTitle>
                        <SetNewPasswordForm/>
                    </CardHeader>
                </Card>

            </section>
        </section>
    )
}