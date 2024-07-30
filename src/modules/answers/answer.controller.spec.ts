import { Test, TestingModule } from '@nestjs/testing';
import { AnswerAreasController } from './answer.controller';
import { AnswerAreasService } from './answer.service';

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
