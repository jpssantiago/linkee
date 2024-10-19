import { IsEmail, IsString, Length } from "class-validator"

export class SignInDTO {
    @IsString()
    @IsEmail()
    email: string
    
    @IsString()
    @Length(8)
    password: string
}