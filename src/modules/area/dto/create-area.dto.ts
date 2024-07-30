import { IsNotEmpty } from "class-validator";

export class CreateAreaDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
