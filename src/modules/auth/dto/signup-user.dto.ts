import { IsNotEmpty, IsEmail } from "class-validator";

export class SignUpUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}


