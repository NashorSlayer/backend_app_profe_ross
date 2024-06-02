import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AreaModule } from './modules/area/area.module';
import { SurveyModule } from './modules/survey/survey.module';

@Module({
  imports: [UserModule, AreaModule, SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
