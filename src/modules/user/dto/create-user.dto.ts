import { IsEmail, IsNotEmpty, Max } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Max(10, { message: 'Password is too long' })
    password: string;
}
