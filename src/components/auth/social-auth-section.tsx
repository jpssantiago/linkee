"use client"

import { useState } from "react"

import { SocialAuthButton } from "./social-auth-button"
import { GoogleIcon } from "@/components/icons/google"
import { AppleIcon } from "@/components/icons/apple"

type Provider = "google" | "apple"

export function SocialAuthSection() {
    const [isLoading, setIsLoading] = useState<Provider | null>(null)

    async function signInWith(provider: "google" | "apple") {
        if (isLoading) return

        setIsLoading(provider)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsLoading(null)
    }

    return (
        <div className="space-y-4">
            <SocialAuthButton onClick={() => signInWith("google")} disabled={isLoading == "google"}>
                <GoogleIcon />

                Continue with Google
            </SocialAuthButton>

            <SocialAuthButton onClick={() => signInWith("apple")} disabled={isLoading == "apple"}>
                <AppleIcon />

                Continue with Apple
            </SocialAuthButton>
        </div>
    )
}