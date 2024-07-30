import { PartialType } from '@nestjs/mapped-types';
import { CreateAreasFormsDto } from './create-areas_forms.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAreasFormsDto extends PartialType(CreateAreasFormsDto) {

    @IsNotEmpty()
    Area: {
        name: string
    }
}
