import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"

type LinkeeLayoutProps = {
    children?: ReactNode
}

export default async function LinkeeLayout({ children }: LinkeeLayoutProps) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return redirect("/auth")
    }

    return (
        <>
            {children}
        </>
    )
}