import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { FormsExceptions, UserExceptions } from 'src/utils/exceptions';
import { selectFormWithoutId, selectFormsWithId, selectTitlesByUser } from 'src/querys/form.query';
import { IForm, IGetTitlesForm } from 'src/interfaces/form.interface';

@Injectable()
export class FormService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) { }

  async create(createFormDto: CreateFormDto): Promise<IForm> {
    const { title, description, date_start, date_end, type, range } = createFormDto


    const userFound = await this.userService.findOne(createFormDto.user.id)
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
          type: type,
          range: range,
          user: {
            connect: { id: userFound.id }
          }
        },
        select: {
          ...selectFormWithoutId
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
          ...selectFormsWithId
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
          ...selectFormsWithId
        }
      });
      if (!form) FormsExceptions.NOT_FOUND
      return form
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOneByTitleAndMail(title: string, email: string): Promise<IGetTitlesForm> {
    const userFound = await this.userService.findOneByEmail(email)
    if (!userFound) UserExceptions.NOT_FOUND

    try {
      const form = await this.prismaService.forms.findUnique({
        where: {
          title_creator_id: {
            title: title,
            creator_id: userFound.id
          }
        },
        select: {
          ...selectTitlesByUser
        }
      })
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
          ...selectFormWithoutId
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
          ...selectFormsWithId
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }
}
