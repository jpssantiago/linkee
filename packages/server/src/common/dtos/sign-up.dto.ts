import { IsEmail, IsString, Length } from "class-validator"

export class SignUpDTO {
    @IsString()
    @IsEmail()
    email: string
    
    @IsString()
    @Length(8)
    password: string

    @IsString()
    @Length(3, 30)
    username: string
}