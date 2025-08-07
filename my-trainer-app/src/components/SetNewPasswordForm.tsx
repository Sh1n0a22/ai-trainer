"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {FormProvider, useForm } from "react-hook-form";
import {z} from "zod";
import InputFormField from "./ui/InputFormField";
import { Button } from "./ui/button";
import { changePasswordClient } from "@/app/(auth)/clientActions";
import { Form } from "./ui/form";
import { changePassword } from "@/app/(auth)/actions";


export default function SetNewPasswordForm() {
     const formSchema = z.object({
              password: z.string().min(8, "at least 8 characters").max(20)
        })
    
    
    
        type FormValues = z.infer<typeof formSchema>;
    
    
       
        const methods = useForm<FormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                password: "",
            },
            mode: "onBlur",
        });
    
        const { handleSubmit, formState } = methods;

        async function onSubmit(values: FormValues) {
            await changePassword(values.password)
            await changePasswordClient(values.password)
            }

    return (
        <Form {...methods}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <fieldset className="grid gap-6">
                        <InputFormField
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="password"
                        />

                    </fieldset>
                    <div className="flex-col flex gap-3">
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? "Setting new password..." : "Set new password"}
                        </Button>
                    </div>

                </form>
            </FormProvider>
        </Form>
    )
}