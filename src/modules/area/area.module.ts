import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FormModule } from '../forms/forms.module';

@Module({
  imports: [PrismaModule, FormModule],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService]
})
export class AreaModule { }
