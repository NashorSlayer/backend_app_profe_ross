import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AreaModule } from '../area/area.module';
import { FormModule } from '../forms/forms.module';

@Module({
  imports: [PrismaModule, AreaModule, FormModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule { }
