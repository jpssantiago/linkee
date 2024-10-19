import { Module } from '@nestjs/common'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { TokenService } from '../token/token.service'

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService, TokenService]
})
export class AccountModule {}