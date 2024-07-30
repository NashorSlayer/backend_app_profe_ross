import { IsNotEmpty } from "class-validator";

export class DeleteAreaFormsDto {
    @IsNotEmpty()
    Area: {
        name: string;
    };
}