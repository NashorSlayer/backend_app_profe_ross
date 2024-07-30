import { Module } from '@nestjs/common';
import { AreasFormsService } from './areas_forms.service';
import { AreasFormsController } from './areas_forms.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AreaModule } from '../area/area.module';
import { FormModule } from '../forms/forms.module';

@Module({
  imports: [PrismaModule, AreaModule, FormModule],
  controllers: [AreasFormsController],
  providers: [AreasFormsService],
})
export class AreasFormsModule { }
