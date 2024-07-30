import { Injectable } from '@nestjs/common';
import { CreateAnswersDto } from './dto/create-answers.dto';
import { UpdateAnswersDto } from './dto/update-answers.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FormService } from '../forms/forms.service';
import { AreaService } from '../area/area.service';

@Injectable()
export class AnswerService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly formSevice: FormService,

  ) { }

  create(createAnswerDto: CreateAnswersDto) {
    return 'This action adds a new answerArea';
  }

  async findAll() {
    return await this.prismaService.answers.findMany();
  }

  async findOne(id: string) {

  }

  async update(id: string, updateAnswerDto: UpdateAnswersDto) {

  }

  remove(id: string) {
    return `This action removes a #${id} answerArea`;
  }
}
