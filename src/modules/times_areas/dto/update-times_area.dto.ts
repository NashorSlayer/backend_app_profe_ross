import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesAreaDto } from './create-times_area.dto';
import { IsDate } from 'class-validator';

export class UpdateTimesAreaDto extends PartialType(CreateTimesAreaDto) {
    @IsDate()
    time_start?: string;

    @IsDate()
    time_end?: string;
}
