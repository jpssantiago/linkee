"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"

const emailAuthSchema = z.object({
    email: z.string().email({ message: "This email doesn't look valid" })
})

type EmailAuthSchemaType = z.infer<typeof emailAuthSchema>

export function EmailAuthForm() {
    const { handleSubmit, register, formState } = useForm<EmailAuthSchemaType>({
        resolver: zodResolver(emailAuthSchema)
    })

    async function onSubmit({ email }: EmailAuthSchemaType) {
        try {
            const response = await signIn("email", { email, redirect: false })
    
            if (!response) {
                return toast.error("Unknown error. Please try again later.")
            }
            
            if (response.error) {
                return toast.error(response.error)
            }
            
            toast.success("Email sent - Check your inbox (or spam).")
        } catch {
            return toast.error("Unknown error. Please try again later.")
        }
    }

    return (
        <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
                <Input
                    placeholder="email@provider.com"
                    className={formState.errors.email?.message && "border-destructive"}
                    {...register("email")}
                />

                <p className="text-destructive text-sm">
                    {formState.errors.email?.message}
                </p>
            </div>

            <LoadingButton isLoading={formState.isSubmitting} className="w-full">
                Continue with email
            </LoadingButton>
        </form>
    )
}