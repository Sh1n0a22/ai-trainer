import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"

import { loginClient } from "@/app/(auth)/clientActions";
import InputFormField from "./ui/InputFormField";

export default function LoginForm() {
    const formSchema = z.object({
        email: z.email(),
        password: z.string().min(8, "at least 8 characters").max(20)
    })

    type FormValues = z.infer<typeof formSchema>;


    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const { handleSubmit, formState } = methods;

    async function onSubmit(values: FormValues) {
       await loginClient(values)
    }

    return (
        <Form {...methods}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <fieldset className="grid gap-6">
                        <InputFormField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />

                        <InputFormField
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            additionalLabelInfo="Forgot your password?"
                        />
                    </fieldset>


                    <div className="flex-col flex gap-3">
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? "Logining..." : "Login"}
                        </Button>
                        <div className="flex justify-between flex-wrap ">
                            <span className="w-fit"> Don't have an account? </span>
                            <a href="/signUp" className="underline self-end inline">Sign Up</a>
                        </div>
                    </div>

                </form>
            </FormProvider>
        </Form>
    )
}