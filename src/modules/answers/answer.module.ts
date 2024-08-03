import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FormModule } from '../forms/forms.module';

@Module({
  imports: [PrismaModule, FormModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule { }
