import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateTimesAreaDto {

    @IsNumber({}, { message: 'Time Start must be a number' })
    time_start: number;

    @IsNumber({}, { message: 'Time End must be a number' })
    time_end: number;

    @IsNotEmpty({ message: 'Area ID is required' })
    Area: {
        id: string;
    }

    @IsNotEmpty({ message: 'Answer ID is required' })
    Answer: {
        id: string;
    }


}
