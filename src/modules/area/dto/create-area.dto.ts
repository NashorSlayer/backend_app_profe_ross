import { IsNotEmpty } from "class-validator";

export class CreateAreaDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Form_id is required' })
    Form: {
        id: string
    }
}
