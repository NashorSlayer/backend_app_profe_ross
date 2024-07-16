import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerAreaDto } from './create-answer_area.dto';
import { Area } from 'src/entities';

export class UpdateAnswerAreaDto extends PartialType(CreateAnswerAreaDto) {
    Area: Area
}
