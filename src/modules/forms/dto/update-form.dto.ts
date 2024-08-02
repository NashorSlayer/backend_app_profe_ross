import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto, validateDate } from './create-form.dto';
import { IsDateString, Validate, } from 'class-validator';




export class UpdateFormDto extends PartialType(CreateFormDto) {

    title: string;

    description: string;

    @IsDateString()
    @Validate((value: Date) => validateDate(value))
    date_start: Date;

    @IsDateString()
    @Validate((value: Date) => validateDate(value))
    date_end: Date;

    disabled: boolean;
}
