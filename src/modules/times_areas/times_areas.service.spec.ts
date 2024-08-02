import { Test, TestingModule } from '@nestjs/testing';
import { TimesAreasService } from './times_areas.service';

describe('TimesAreasService', () => {
  let service: TimesAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesAreasService],
    }).compile();

    service = module.get<TimesAreasService>(TimesAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
