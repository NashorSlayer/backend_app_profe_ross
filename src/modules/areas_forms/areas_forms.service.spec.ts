import { Test, TestingModule } from '@nestjs/testing';
import { SurveysAreasService } from './areas_forms.service';

describe('SurveysAreasService', () => {
  let service: SurveysAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveysAreasService],
    }).compile();

    service = module.get<SurveysAreasService>(SurveysAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
