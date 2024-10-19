import { HttpException } from "@nestjs/common"

export class AccountNotFoundException extends HttpException {
    constructor() {
        super("Account does not exist", 404)
    }
}

export class EmailInUseException extends HttpException {
    constructor() {
        super("Email already in use", 409)
    }
}