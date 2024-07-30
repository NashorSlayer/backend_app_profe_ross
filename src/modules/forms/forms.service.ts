import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { IForm } from 'src/interfaces/interface';

@Injectable()
export class FormService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) { }

  async create(createSurveyDto: CreateFormDto): Promise<IForm> {

    const { title, description, date_start, date_end } = createSurveyDto
    const userFound = await this.userService.findOne(createSurveyDto.user.id)
    if (!userFound) throw new Error("User not found")

    if (date_end < date_start) throw new BadRequestException("Date end must be greater than date start")

    const dateStartFormated = new Date(date_start)
    const dateEndFormated = new Date(date_end)


    const form = await this.prismaService.forms.create({
      data: {
        title: title,
        description: description,
        date_start: dateStartFormated,
        date_end: dateEndFormated,
        user: {
          connect: { id: userFound.id }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_start: true,
        date_end: true,
        disabled: true,
        user: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });
    return form
  }

  async findAll(): Promise<IForm[]> {
    return await this.prismaService.forms.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date_start: true,
        date_end: true,
        disabled: true,
        user: {
          select: {
            username: true,
            email: true
          }
        },
      },
    });
  }

  async findOne(id: string): Promise<IForm> {

    const form = await this.prismaService.forms.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        date_start: true,
        date_end: true,
        disabled: true,
        user: {
          select: {
            username: true,
            email: true
          }
        },
      }
    });
    if (!form) throw new BadRequestException("Form not found")
    return form
  }

  async update(id: string, updateFormDTO: UpdateFormDto): Promise<IForm> {
    const formFound = await this.findOne(id)
    if (!formFound) throw new BadRequestException("Form not found")

    const { title, description, date_start, date_end, disabled } = updateFormDTO

    if (date_end < date_start) throw new BadRequestException("Date end must be greater than date start")


    const updateForm = this.prismaService.forms.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        date_start: date_start,
        date_end: date_end,
        disabled: disabled
      },
      select: {
        id: true,
        title: true,
        description: true,
        date_start: true,
        date_end: true,
        disabled: true,
        user: {
          select: {
            email: true,
            username: true
          }
        }
      }
    })
    return updateForm
  }

  async remove(id: string): Promise<IForm> {
    const formFound = await this.findOne(id)
    if (!formFound) throw new BadRequestException("Form not found")
    return await this.prismaService.forms.delete({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        date_start: true,
        date_end: true,
        disabled: true,
        user: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });
  }
}