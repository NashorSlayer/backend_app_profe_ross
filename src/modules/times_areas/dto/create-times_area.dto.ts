import { IsDate, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateTimesAreaDto {

    @IsDate()
    time_start: string;

    @IsDate()
    time_end: string;

    @IsNotEmpty({ message: 'Area ID is required' })
    Area: {
        id: string;
    }

    @IsNotEmpty({ message: 'Answer ID is required' })
    Answer: {
        id: string;
    }


}
