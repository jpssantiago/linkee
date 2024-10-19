import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common'

import { SignUpDTO } from 'src/common/dtos/sign-up.dto'
import { SignInDTO } from 'src/common/dtos/sign-in.dto'
import { HashService } from '../hash/hash.service'
import { AccountService } from '../account/account.service'
import { TokenService } from '../token/token.service'

@Controller('auth')
export class AuthController {
    constructor(
        private hashService: HashService,
        private accountService: AccountService,
        private tokenService: TokenService
    ) {}

    @Post("/signup")
    async signUp(@Body() { email, password, username }: SignUpDTO) {
        const hash = await this.hashService.hashPassword(password)
        const account = await this.accountService.create(email, hash, username)

        const token = this.tokenService.signToken(account.id)
        return {
            token
        }
    }

    @Post("/signin")
    @HttpCode(200)
    async signIn(@Body() { email, password }: SignInDTO) {
        const account = await this.accountService.findByEmail(email)

        const match = await this.hashService.comparePasswordWithHash(password, account.password)
        if (!match) {
            throw new UnauthorizedException("Email or password is incorrect")
        }

        const token = this.tokenService.signToken(account.id)
        return {
            token
        }
    }
}