import { IsNotEmpty } from "class-validator"

export class CreateAreasFormsDto {

    @IsNotEmpty()
    Form: {
        id: string
    }
    @IsNotEmpty()
    Area: {
        name: string
    }
}
