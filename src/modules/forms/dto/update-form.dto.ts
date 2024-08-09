import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import { IsDate, IsNumber } from 'class-validator';

export class UpdateFormDto extends PartialType(CreateFormDto) {

    title?: string;

    description?: string;

    @IsDate()
    date_start?: string;

    @IsDate()
    date_end?: string;

    type?: string;

    @IsNumber()
    range?: number;
}
