import { PartialType } from '@nestjs/mapped-types';
import { CreateAreasFormsDto } from './create-areas_forms.dto';
import { IArea } from 'src/interfaces/interface';

export class UpdateAreasFormsDto extends PartialType(CreateAreasFormsDto) {
    Area: IArea
}
