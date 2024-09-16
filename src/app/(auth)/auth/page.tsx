import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { EmailAuthForm } from "@/components/auth/email-auth-form"
import { OrSeparator } from "@/components/auth/or-separator"
import { SocialAuthSection } from "@/components/auth/social-auth-section"

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    if (session && session.user) {
        return redirect("/home")
    }

    return (
        <div className="flex justify-center items-center w-dvh h-dvh">
            <div className="space-y-5 w-full max-w-[350px]">
                <div className="space-y-0.5 text-center">
                    <h1 className="font-bold text-lg">
                        Welcome to Linkee.
                    </h1>

                    <p className="text-sm text-zinc-600">
                        Bio links, portfolio and showcase. Free & Open Source.
                    </p>
                </div>

                <EmailAuthForm />

                <OrSeparator />

                <SocialAuthSection />
            </div>
        </div>
    )
}