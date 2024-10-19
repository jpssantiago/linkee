import { BadRequestException, Controller, Get, Headers } from '@nestjs/common'

import { TokenService } from '../token/token.service'
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
    constructor(
        private tokenService: TokenService,
        private accountService: AccountService
    ) {}

    @Get()
    async getAccount(@Headers("authorization") authorization: string) {
        if (!authorization) {
            throw new BadRequestException("Authorization token must not be empty")
        }

        const token = authorization.split(" ")[1]
        const id = this.tokenService.decodeToken(token)

        const account = await this.accountService.findById(id)
        return {
            account
        }
    }
}