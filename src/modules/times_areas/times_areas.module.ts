import { Module } from '@nestjs/common';
import { TimesAreasService } from './times_areas.service';
import { TimesAreasController } from './times_areas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AreaService } from '../areas/area.service';
import { AreaModule } from '../areas/area.module';
import { AnswerModule } from '../answers/answer.module';

@Module({
  imports: [PrismaModule, AreaModule, AnswerModule],
  controllers: [TimesAreasController],
  providers: [TimesAreasService],
  exports: [TimesAreasService]
})
export class TimesAreasModule { }
