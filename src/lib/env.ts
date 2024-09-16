import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string(),
    NEXT_AUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string()
})

export const env = envSchema.parse(process.env)