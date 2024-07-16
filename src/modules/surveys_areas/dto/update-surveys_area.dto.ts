import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveysAreaDto } from './create-surveys_area.dto';
import { Area } from 'src/entities';

export class UpdateSurveysAreaDto extends PartialType(CreateSurveysAreaDto) {
    Area: Area
}
