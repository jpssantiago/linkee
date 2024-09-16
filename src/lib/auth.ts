import { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { sendVerificationRequestEmail } from "./emails/send-verification-request-email"
import { prisma } from "./prisma"
import { env } from "./env"

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: env.NEXT_AUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }) => {
            if (!token.email) {
                return {}
            }
            
            if (user) {
                token.user = user
            }

            return token
        }
    },
    pages: {
        signIn: "/auth",
        error: "/auth",
        newUser: "/welcome"
    },
    providers: [
        EmailProvider({
            async sendVerificationRequest({ identifier, url }) {
                if (process.env.NODE_ENV == "development") {
                    console.log(`[Magic link] ${url}`)
                } else {
                    await sendVerificationRequestEmail(identifier, url)
                }
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma)
}