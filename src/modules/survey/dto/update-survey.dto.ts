import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyDto } from './create-survey.dto';
import { User } from 'src/entities';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
    title: string;
    description: string;
    time_range_start: Date;
    time_range_end: Date;
    answer_time_start: Date;
    answer_time_end: Date;
    disabled: boolean;
    user: User;
}
