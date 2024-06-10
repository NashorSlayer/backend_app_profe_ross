import { Injectable } from '@nestjs/common';
import { CreateAnswerAreaDto } from './dto/create-answer_area.dto';
import { UpdateAnswerAreaDto } from './dto/update-answer_area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SurveyService } from '../survey/survey.service';
import { AreaService } from '../area/area.service';

@Injectable()
export class AnswerAreasService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly surveyService: SurveyService,

  ) { }

  create(createAnswerAreaDto: CreateAnswerAreaDto) {
    return 'This action adds a new answerArea';
  }

  async findAll() {
    return await this.prismaService.answer_areas.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.answer_areas.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateAnswerAreaDto: UpdateAnswerAreaDto) {
    const areaFound = await this.areaService.findOne(updateAnswerAreaDto.Area.id);
    if (!areaFound) throw new Error('Area not found');
    return await this.prismaService.answer_areas.update({
      where: { id: id },
      data: {
        area: {
          connect: {
            id: areaFound.id
          }
        }
      }
    })
  }

  remove(id: string) {
    return `This action removes a #${id} answerArea`;
  }
}
