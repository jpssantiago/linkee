import { ReactNode } from "react"
import { Resend } from "resend"

import { env } from "./env"

const resend = new Resend(env.RESEND_API_KEY)

type SendEmailProps = {
    from?: string
    to: string[]
    subject: string
    content: ReactNode
}

export async function sendEmail({ from, to, subject, content }: SendEmailProps): Promise<boolean> {
     const { error } = await resend.emails.send({
        from: from ?? "João from Linkee <noreply@linkee.app>",
        to,
        subject,
        react: content
    })

    return !!error
}