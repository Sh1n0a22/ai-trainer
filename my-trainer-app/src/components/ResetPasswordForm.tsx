"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {FormProvider, useForm } from "react-hook-form";
import {z} from "zod";
import InputFormField from "./ui/InputFormField";
import { Button } from "./ui/button";
import { resetPasswordClient } from "@/app/(auth)/clientActions";
import { Form } from "./ui/form";


export default function ResetPasswordForm() {
     const formSchema = z.object({
            email: z.email(),
        })
    
    
    
        type FormValues = z.infer<typeof formSchema>;
    
    
       
        const methods = useForm<FormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
            },
            mode: "onBlur",
        });
    
        const { handleSubmit, formState } = methods;

        async function onSubmit(values: FormValues) {
            await resetPasswordClient(values.email)
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

                    </fieldset>


                    <div className="flex-col flex gap-3">
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? "Reseting..." : "Reset password"}
                        </Button>
                    </div>

                </form>
            </FormProvider>
        </Form>
    )
}