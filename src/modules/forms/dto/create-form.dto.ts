import { IsNotEmpty } from "class-validator";

export class CreateFormDto {
    @IsNotEmpty({ message: "Title is required" })
    title: string;

    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsNotEmpty({ message: "Date start is required" })
    date_start: Date;

    @IsNotEmpty({ message: "Date end is required" })
    date_end: Date;

    @IsNotEmpty({ message: "User is required" })
    user: {
        id: string;
    };
}
