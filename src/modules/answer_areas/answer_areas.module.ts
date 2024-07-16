import { Module } from '@nestjs/common';
import { AnswerAreasService } from './answer_areas.service';
import { AnswerAreasController } from './answer_areas.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AreaModule } from '../area/area.module';
import { SurveyModule } from '../survey/survey.module';

@Module({
  imports: [PrismaModule, AreaModule, SurveyModule],
  controllers: [AnswerAreasController],
  providers: [AnswerAreasService],
})
export class AnswerAreasModule { }
