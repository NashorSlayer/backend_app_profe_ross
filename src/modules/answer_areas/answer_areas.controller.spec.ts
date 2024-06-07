import { Test, TestingModule } from '@nestjs/testing';
import { AnswerAreasController } from './answer_areas.controller';
import { AnswerAreasService } from './answer_areas.service';

describe('AnswerAreasController', () => {
  let controller: AnswerAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerAreasController],
      providers: [AnswerAreasService],
    }).compile();

    controller = module.get<AnswerAreasController>(AnswerAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
