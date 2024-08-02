import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswersDto } from './create-answers.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAnswersDto extends PartialType(CreateAnswersDto) {

    @IsNotEmpty()
    @IsEmail()
    mail: string;
}
