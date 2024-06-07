import { Injectable } from '@nestjs/common';
import { CreateAnswerAreaDto } from './dto/create-answer_area.dto';
import { UpdateAnswerAreaDto } from './dto/update-answer_area.dto';

@Injectable()
export class AnswerAreasService {
  create(createAnswerAreaDto: CreateAnswerAreaDto) {
    return 'This action adds a new answerArea';
  }

  findAll() {
    return `This action returns all answerAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerArea`;
  }

  update(id: number, updateAnswerAreaDto: UpdateAnswerAreaDto) {
    return `This action updates a #${id} answerArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerArea`;
  }
}
