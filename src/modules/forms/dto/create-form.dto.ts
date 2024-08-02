import { IsDateString, IsNotEmpty, Validate } from "class-validator";

export function validateDate(date: Date) {
    if (date < new Date()) {
        return false;
    }
    return true;
}

export class CreateFormDto {
    @IsNotEmpty({ message: "Title is required" })
    title: string;

    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsNotEmpty({ message: "Date start is required" })
    @IsDateString()
    @Validate((value: Date) => validateDate(value))
    date_start: Date;

    @IsNotEmpty({ message: "Date end is required" })
    @IsDateString()
    @Validate((value: Date) => validateDate(value))
    date_end: Date;

    @IsNotEmpty({ message: "User is required" })
    user: {
        id: string;
    };
}
