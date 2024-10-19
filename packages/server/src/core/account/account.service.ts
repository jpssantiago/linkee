import { Injectable } from '@nestjs/common'
import { Account } from '@prisma/client'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { AccountNotFoundException, EmailInUseException } from 'src/common/exceptions'

@Injectable()
export class AccountService {
    constructor(private prismaService: PrismaService) {}

    async create(email: string, hash: string, username: string): Promise<Account> {
        try {
            const emailSplit = email.split("@")[0]

            const account = await this.prismaService.account.create({
                data: {
                    email,
                    password: hash,
                    username,
                    name: emailSplit.slice(0, 1).toUpperCase() + emailSplit.slice(1)
                }
            })

            if (!account) {
                throw new AccountNotFoundException()
            }

            return account
        } catch {
            throw new EmailInUseException()
        }
    }

    async findByEmail(email: string): Promise<Account> {
        const account = await this.prismaService.account.findUnique({
            where: {
                email
            }
        })

        if (!account) {
            throw new AccountNotFoundException()
        }

        return account
    }

    async findById(id: string): Promise<Account> {
        const account = await this.prismaService.account.findUnique({
            where: {
                id
            }
        })

        if (!account) {
            throw new AccountNotFoundException()
        }

        delete account.password
        return account
    }
}