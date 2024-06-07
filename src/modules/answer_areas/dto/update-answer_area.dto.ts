import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerAreaDto } from './create-answer_area.dto';

export class UpdateAnswerAreaDto extends PartialType(CreateAnswerAreaDto) {}
