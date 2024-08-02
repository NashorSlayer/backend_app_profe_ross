import { Module } from '@nestjs/common';
import { TimesAreasService } from './times_areas.service';
import { TimesAreasController } from './times_areas.controller';

@Module({
  controllers: [TimesAreasController],
  providers: [TimesAreasService],
})
export class TimesAreasModule {}
