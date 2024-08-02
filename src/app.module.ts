import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AreaModule } from './modules/area/area.module';
import { FormModule } from './modules/forms/forms.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnswerModule } from './modules/answers/answer.module';



@Module({
  imports: [UserModule, AreaModule, FormModule, AuthModule, AnswerModule],
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
