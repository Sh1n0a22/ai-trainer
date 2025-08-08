import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import {z} from "zod";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "at least 8 characters").max(20)
})



export type FormValues = z.infer<typeof formSchema>;

export default function InputFormField<TName extends keyof FormValues>({
    name,
    label,
    type = "text",
    placeholder,
    autoComplete,
    additionalLabelInfo }: {
        name: TName;
        label: string;
        type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
        placeholder?: string;
        autoComplete?: string;
        additionalLabelInfo?: string
    }) {

    const { control } = useFormContext<FormValues>();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label} {additionalLabelInfo ? <a
                        href="/forgetPassword"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                        {additionalLabelInfo}
                    </a> : ""} </FormLabel>
                    <FormControl>

                        <Input
                            className="my-2"
                            type={type}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}