import { Test, TestingModule } from '@nestjs/testing';
import { SurveysAreasController } from './surveys_areas.controller';
import { SurveysAreasService } from './surveys_areas.service';

describe('SurveysAreasController', () => {
  let controller: SurveysAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysAreasController],
      providers: [SurveysAreasService],
    }).compile();

    controller = module.get<SurveysAreasController>(SurveysAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
