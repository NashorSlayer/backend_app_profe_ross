import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTimesAreaDto } from './dto/create-times_area.dto';
import { UpdateTimesAreaDto } from './dto/update-times_area.dto';
import { AreaService } from '../areas/area.service';
import { AnswerService } from '../answers/answer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IGetTimesAreas } from 'src/interfaces/times_areas.interface';
import { selectTimesAreas } from "../../querys/times_areas.query"
import { AnswersExceptions, AreasExceptions, TimesAreasExceptions } from 'src/utils/exceptions';

@Injectable()
export class TimesAreasService {

  constructor(
    private readonly areaService: AreaService,
    private readonly answerService: AnswerService,
    private readonly prismaService: PrismaService,
  ) { }

  async create(createTimesAreaDto: CreateTimesAreaDto): Promise<IGetTimesAreas> {

    const { time_start, time_end, Area, Answer } = createTimesAreaDto;

    const answerFound = await this.answerService.findOne(Answer.id);
    if (!answerFound) AnswersExceptions.NOT_FOUND;

    const areaFound = await this.areaService.findAreaByName(answerFound.form.id, Area.name);
    if (!areaFound) AreasExceptions.NOT_FOUND;

    const timeStartFormatted = new Date(time_start);
    const timeEndFormatted = new Date(time_end);

    try {
      const timesArea = await this.prismaService.times_areas.create({
        data: {
          time_start: timeStartFormatted,
          time_end: timeEndFormatted,
          area: {
            connect: {
              id: areaFound.id
            },
          },
          answer: {
            connect: {
              id: answerFound.id
            }
          }
        },
        select: {
          ...selectTimesAreas
        }
      })
      if (!timesArea) TimesAreasExceptions.NOT_CREATED;
      return timesArea;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<IGetTimesAreas[]> {
    try {
      return await this.prismaService.times_areas.findMany({
        select: {
          ...selectTimesAreas
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<IGetTimesAreas> {
    try {
      const timesAreaFound = await this.prismaService.times_areas.findUnique({
        where: {
          id: id
        },
        select: {
          ...selectTimesAreas
        },
      })
      if (!timesAreaFound) TimesAreasExceptions.NOT_FOUND;
      return timesAreaFound;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateTimesAreaDto: UpdateTimesAreaDto): Promise<IGetTimesAreas> {
    const answerFound = await this.answerService.findOne(id);
    if (!answerFound) AnswersExceptions.NOT_FOUND;

    const areaFound = this.areaService.findAreaByName(answerFound.form.id, updateTimesAreaDto.Area.name);
    if (!areaFound) AreasExceptions.NOT_FOUND;

    try {
      const timesAreasUpdated = await this.prismaService.times_areas.update({
        where: {
          id: id
        },
        data: {
          time_start: updateTimesAreaDto.time_start,
          time_end: updateTimesAreaDto.time_end,
        },
        select: {
          ...selectTimesAreas
        }
      })
      if (!timesAreasUpdated) TimesAreasExceptions.NOT_UPDATED;
      return timesAreasUpdated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    const answerFound = await this.prismaService.times_areas.findUnique({
      where: { id: id }
    })
    if (!answerFound) TimesAreasExceptions.NOT_FOUND;
    try {
      const times_areas = await this.prismaService.times_areas.delete({
        where: {
          id: id
        },
        select: {
          ...selectTimesAreas
        }
      })
      if (!times_areas) TimesAreasExceptions.NOT_DELETED;
      return times_areas;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
