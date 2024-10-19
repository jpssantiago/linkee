import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload, sign, verify } from "jsonwebtoken"

import { env } from 'src/common/env'

@Injectable()
export class TokenService {
    signToken(id: string): string {
        return sign({ id }, env.JWT_SECRET_KEY, { expiresIn: "7d" })
    }

    decodeToken(token: string): string {
        try {
            const payload = verify(token, env.JWT_SECRET_KEY)
            return (payload as JwtPayload).id
        } catch {
            throw new UnauthorizedException("Authorization token is invalid")
        }
    }
}