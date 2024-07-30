import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswersDto } from './create-answers.dto';
import { IArea } from '../../../interfaces/interface';

export class UpdateAnswersDto extends PartialType(CreateAnswersDto) {
    Area: IArea
}
