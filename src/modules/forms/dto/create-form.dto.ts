import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class CreateFormDto {
    @IsNotEmpty({ message: "Title is required" })
    title: string;

    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsNotEmpty({ message: "Date start is required" })
    @IsDateString()
    date_start: string;

    @IsDateString()
    @IsNotEmpty({ message: "Date end is required" })
    date_end: string;

    @IsNotEmpty({ message: "Type is required" })
    type: string;

    @IsNotEmpty({ message: "Range is required" })
    range: number;

    @IsNotEmpty({ message: "User is required" })
    user: {
        id: string;
    };
}
