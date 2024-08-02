import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAnswersDto {
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    Form: {
        id: string
    }


}
