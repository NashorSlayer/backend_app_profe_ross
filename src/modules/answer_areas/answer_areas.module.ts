import { Module } from '@nestjs/common';
import { AnswerAreasService } from './answer_areas.service';
import { AnswerAreasController } from './answer_areas.controller';

@Module({
  controllers: [AnswerAreasController],
  providers: [AnswerAreasService],
})
export class AnswerAreasModule {}
