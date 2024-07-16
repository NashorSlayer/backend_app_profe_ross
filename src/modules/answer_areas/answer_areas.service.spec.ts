import { Test, TestingModule } from '@nestjs/testing';
import { AnswerAreasService } from './answer_areas.service';

describe('AnswerAreasService', () => {
  let service: AnswerAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerAreasService],
    }).compile();

    service = module.get<AnswerAreasService>(AnswerAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
