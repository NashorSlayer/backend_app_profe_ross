import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesAreaDto } from './create-times_area.dto';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateTimesAreaDto extends PartialType(CreateTimesAreaDto) {
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
}
