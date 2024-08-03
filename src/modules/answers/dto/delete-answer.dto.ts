import { IsEmail, IsNotEmpty } from "class-validator";

export class DeleteAnswerDto {

    @IsNotEmpty({ message: 'Mail is required' })
    @IsEmail({}, { message: 'Invalid email' })
    mail: string;

    @IsNotEmpty({ message: 'Form ID is required' })
    Form: {
        id: string
    }
}