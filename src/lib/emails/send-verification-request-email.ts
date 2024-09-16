import { sendEmail } from "@/lib/resend"
import { VerificationRequestEmail } from "@/components/emails/verification-request-email"

export async function sendVerificationRequestEmail(email: string, link: string) {
    await sendEmail({
        to: [email],
        subject: "Hello from Linkee",
        content: VerificationRequestEmail(link)
    })
}