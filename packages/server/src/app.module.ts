import { Module } from '@nestjs/common'
import { PingModule } from './core/ping/ping.module'
import { PrismaService } from './common/prisma/prisma.service'
import { AuthModule } from './core/auth/auth.module';
import { AccountModule } from './core/account/account.module';
import { HashService } from './core/hash/hash.service';
import { TokenService } from './core/token/token.service';

@Module({
  imports: [PingModule, AuthModule, AccountModule],
  controllers: [],
  providers: [PrismaService, HashService, TokenService]
})
export class AppModule {}