import { Test, TestingModule } from '@nestjs/testing';
import { TimesAreasController } from './times_areas.controller';
import { TimesAreasService } from './times_areas.service';

describe('TimesAreasController', () => {
  let controller: TimesAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesAreasController],
      providers: [TimesAreasService],
    }).compile();

    controller = module.get<TimesAreasController>(TimesAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
