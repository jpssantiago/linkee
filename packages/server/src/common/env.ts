import { z } from "zod"

const envSchema = z.object({
    BCRYPT_SALT_ROUNDS: z.coerce.number(),
    JWT_SECRET_KEY: z.string()
})

export const env = envSchema.parse(process.env)