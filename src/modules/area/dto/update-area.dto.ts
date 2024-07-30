import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {

    @IsNotEmpty()
    name: string;
}
