"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { SocialAuthButton } from "./social-auth-button"
import { GoogleIcon } from "@/components/icons/google"
import { GithubIcon } from "@/components/icons/github"

type Provider = "google" | "github"

export function SocialAuthSection() {
    const [isLoading, setIsLoading] = useState<Provider | null>(null)

    async function signInWith(provider: "google" | "github") {
        if (isLoading) return

        try {
            setIsLoading(provider)
            const response = await signIn(provider, { callbackUrl: "/home" })
            setIsLoading(null)
    
            if (response?.error) {
                return toast.error(response.error)
            }
        } catch {
            toast.error("Unknown error. Please try again later.")
        }
    }

    return (
        <div className="space-y-4">
            <SocialAuthButton onClick={() => signInWith("google")} disabled={isLoading == "google"}>
                <GoogleIcon />

                Continue with Google
            </SocialAuthButton>

            <SocialAuthButton onClick={() => signInWith("github")} disabled={isLoading == "github"}>
                <GithubIcon />

                Continue with GitHub
            </SocialAuthButton>
        </div>
    )
}