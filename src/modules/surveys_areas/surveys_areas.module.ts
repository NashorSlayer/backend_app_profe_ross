import { Module } from '@nestjs/common';
import { SurveysAreasService } from './surveys_areas.service';
import { SurveysAreasController } from './surveys_areas.controller';

@Module({
  controllers: [SurveysAreasController],
  providers: [SurveysAreasService],
})
export class SurveysAreasModule {}
