import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAnswersDto {
    @IsNotEmpty({ message: 'Mail is required' })
    @IsEmail({}, { message: 'Invalid Mail, must be email' })
    mail: string;

    @IsNotEmpty({ message: 'Form ID is required' })
    Form: {
        id: string
    }


}
