import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import { IsDateString, Validate, } from 'class-validator';




export class UpdateFormDto extends PartialType(CreateFormDto) {

    title: string;

    description: string;

    @IsDateString()
    date_start: Date;

    @IsDateString()
    date_end: Date;
}
