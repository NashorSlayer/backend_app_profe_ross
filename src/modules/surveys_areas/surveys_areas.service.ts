import { Injectable } from '@nestjs/common';
import { CreateSurveysAreaDto } from './dto/create-surveys_area.dto';
import { UpdateSurveysAreaDto } from './dto/update-surveys_area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AreaService } from '../area/area.service';
import { SurveyService } from '../survey/survey.service';

@Injectable()
export class SurveysAreasService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly surveyService: SurveyService,
  ) { }

  create(createSurveysAreaDto: CreateSurveysAreaDto) {
    const areaFound = this.areaService.findOne(createSurveysAreaDto.Area.id);
    if (!areaFound) throw new Error('Area not found');
    const surveyFound = this.surveyService.findOne(createSurveysAreaDto.Survey.id);
    if (!surveyFound) throw new Error('Survey not found');
    return this.prismaService.surveys_areas.create({
      data: {
        area: {
          connect: {
            id: createSurveysAreaDto.Area.id
          }
        },
        survey: {
          connect: {
            id: createSurveysAreaDto.Survey.id
          }
        }
      }
    });
  }

  findAll() {
    return this.prismaService.surveys_areas.findMany(
      {
        include: {
          area: true,
          survey: true,
        }
      }
    );
  }

  findOne(id: string) {
    return this.prismaService.surveys_areas.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateSurveysAreaDto: UpdateSurveysAreaDto) {

    const areaFound = await this.areaService.findOne(updateSurveysAreaDto.Area.id);
    if (!areaFound) throw new Error('Area not found');
    return await this.prismaService.surveys_areas.update({
      where: { id: id },
      data: {
        area: {
          connect: {
            id: areaFound.id
          }
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.surveys_areas.delete({
      where: { id: id },
      include: {
        area: true,
        survey: true,
      }
    });
  }
}
