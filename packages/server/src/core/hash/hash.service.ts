import { Injectable } from '@nestjs/common'
import { hash, compare } from "bcrypt"

import { env } from 'src/common/env'

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        return await hash(password, env.BCRYPT_SALT_ROUNDS)
    }
    
    async comparePasswordWithHash(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash)
    }
}