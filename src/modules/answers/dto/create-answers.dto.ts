import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAnswersDto {
    @IsNotEmpty()
    Form: {
        id: string
    }

    @IsNotEmpty()
    Area: {
        name: string
    }

    @IsNotEmpty()
    @IsNumber()
    time: number
}
