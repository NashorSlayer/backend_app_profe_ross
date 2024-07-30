import { Module } from '@nestjs/common';
import { FormService } from './forms.service';
import { FormController } from './forms.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService]
})
export class FormModule { }
