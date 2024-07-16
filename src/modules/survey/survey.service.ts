import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { surveys } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class SurveyService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) { }

  async create(createSurveyDto: CreateSurveyDto): Promise<surveys> {
    const user = await this.userService.findOne(createSurveyDto.user.id)
    if (!user) throw new Error("User not found")

    return await this.prismaService.surveys.create({
      data: {
        title: createSurveyDto.title,
        description: createSurveyDto.description,
        time_range_start: createSurveyDto.time_range_start,
        time_range_end: createSurveyDto.time_range_end,
        answer_time_start: createSurveyDto.answer_time_start,
        answer_time_end: createSurveyDto.answer_time_end,
        user: {
          connect: { id: createSurveyDto.user.id }
        }
      },
      include: {
        user: true
      }
    });
  }

  async findAll(): Promise<surveys[]> {
    return await this.prismaService.surveys.findMany({
      include: {
        user: true,
      }
    });
  }

  async findOne(id: string): Promise<surveys> {
    return await this.prismaService.surveys.findUnique({
      where: { id: id },
      include: {
        user: true,
      }
    });
  }

  update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<surveys> {
    return this.prismaService.surveys.update({
      where: { id: id },
      data: {
        title: updateSurveyDto.title,
        description: updateSurveyDto.description,
        time_range_start: updateSurveyDto.time_range_start,
        time_range_end: updateSurveyDto.time_range_end,
        answer_time_start: updateSurveyDto.answer_time_start,
        answer_time_end: updateSurveyDto.answer_time_end,
        disabled: updateSurveyDto.disabled,
        user: {
          connect: { id: updateSurveyDto.user.id }
        }
      },
    })
  }

  async remove(id: string): Promise<surveys> {
    return await this.prismaService.surveys.delete({
      where: { id: id },
      include: {
        user: true,
      }
    });
  }
}