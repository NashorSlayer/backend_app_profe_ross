import { Test, TestingModule } from '@nestjs/testing';
import { SurveysAreasController } from './areas_forms.controller';
import { SurveysAreasService } from './areas_forms.service';

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
