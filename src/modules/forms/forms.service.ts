import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { IForm } from 'src/interfaces/interface';
import { FormsExceptions, UserExceptions } from 'src/utils/exceptions';
import { selectForms } from 'src/querys/form.query';

@Injectable()
export class FormService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) { }

  //TODO: implementar findByTitle(title: string, creator_id: string): Promise<IForm>

  async create(createSurveyDto: CreateFormDto): Promise<IForm> {
    const { title, description, date_start, date_end } = createSurveyDto

    const userFound = await this.userService.findOne(createSurveyDto.user.id)
    if (!userFound) UserExceptions.NOT_FOUND

    const currentDate = new Date()

    const dateStartFormated = new Date(date_start)
    const dateEndFormated = new Date(date_end)

    if (dateStartFormated < currentDate) FormsExceptions.DATE_START_MUST_BE_GREATER
    if (dateEndFormated < currentDate) FormsExceptions.DATE_END_MUST_BE_GREATER
    if (dateEndFormated < dateStartFormated) FormsExceptions.DATE_END_MUST_BE_GREATER_THAN_DATE_START

    try {
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
          ...selectForms
        }
      });
      return form
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  async findAll(): Promise<IForm[]> {
    try {
      return await this.prismaService.forms.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          date_start: true,
          date_end: true,
          user: {
            select: {
              username: true,
              email: true
            }
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOneById(id: string): Promise<IForm> {
    try {
      const form = await this.prismaService.forms.findUnique({
        where: {
          id: id
        },
        select: {
          ...selectForms
        }
      });
      if (!form) FormsExceptions.NOT_FOUND
      return form
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  async update(id: string, updateFormDTO: UpdateFormDto): Promise<IForm> {
    const formFound = await this.findOneById(id)
    if (!formFound) throw new BadRequestException("Form not found")

    const { title, description, date_start, date_end } = updateFormDTO

    if (date_end < date_start) FormsExceptions.DATE_END_MUST_BE_GREATER_THAN_DATE_START

    try {
      const updateForm = this.prismaService.forms.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          date_start: date_start,
          date_end: date_end,
        },
        select: {
          ...selectForms
        }
      })
      return updateForm
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string): Promise<IForm> {
    const formFound = await this.findOneById(id)
    if (!formFound) FormsExceptions.NOT_FOUND

    try {
      return await this.prismaService.forms.delete({
        where: { id: id },
        select: {
          ...selectForms
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }
}
