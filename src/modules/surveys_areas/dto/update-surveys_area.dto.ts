import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveysAreaDto } from './create-surveys_area.dto';

export class UpdateSurveysAreaDto extends PartialType(CreateSurveysAreaDto) {}
