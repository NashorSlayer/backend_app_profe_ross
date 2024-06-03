import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
