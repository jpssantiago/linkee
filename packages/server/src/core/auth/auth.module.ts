import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { HashService } from '../hash/hash.service'
import { AccountService } from '../account/account.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { TokenService } from '../token/token.service'

@Module({
  controllers: [AuthController],
  providers: [HashService, AccountService, PrismaService, TokenService]
})
export class AuthModule {}