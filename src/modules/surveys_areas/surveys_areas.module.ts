import { Module } from '@nestjs/common';
import { SurveysAreasService } from './surveys_areas.service';
import { SurveysAreasController } from './surveys_areas.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AreaModule } from '../area/area.module';
import { SurveyModule } from '../survey/survey.module';

@Module({
  imports: [PrismaModule, AreaModule, SurveyModule],
  controllers: [SurveysAreasController],
  providers: [SurveysAreasService],
})
export class SurveysAreasModule { }
