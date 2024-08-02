import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesAreaDto } from './create-times_area.dto';

export class UpdateTimesAreaDto extends PartialType(CreateTimesAreaDto) {}
