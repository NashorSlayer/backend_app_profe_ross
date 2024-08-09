import { IsDate, IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateTimesAreaDto {

    @IsDateString()
    @IsNotEmpty({ message: 'Time Start is required' })
    time_start: string;

    @IsDateString()
    @IsNotEmpty({ message: 'Time End is required' })
    time_end: string;

    @IsNotEmpty({ message: 'Area Name is required' })
    Area: {
        name: string;
    }
    @IsNotEmpty({ message: 'Answer ID is required' })
    Answer: {
        id: string;
    }
}
