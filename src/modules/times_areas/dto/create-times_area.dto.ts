import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateTimesAreaDto {

    @IsNotEmpty()
    @IsPositive()
    time_start: number;

    @IsNotEmpty()
    @IsPositive()
    time_end: number;

    @IsNotEmpty()
    Area: {
        id: string;
    }

    @IsNotEmpty()
    Answer: {
        id: string;
    }
}
