import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAnswersDto } from './dto/create-answers.dto';
import { UpdateAnswersDto } from './dto/update-answers.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FormService } from '../forms/forms.service';
import { IAnswer } from 'src/interfaces/answer.interface';
import { selectAnswers } from '../../querys/answers.query';
import { AnswersExceptions, FormsExceptions } from 'src/utils/exceptions';

@Injectable()
export class AnswerService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly formSevice: FormService,

  ) { }

  async AnswerExists(id: string, mail: string): Promise<boolean> {
    const answerFound = await this.prismaService.answers.findUnique({
      where: {
        mail_form_id: {
          mail: mail,
          form_id: id
        }
      }
    });
    if (!answerFound) return false;
    return true;
  }

  async create(createAnswerDto: CreateAnswersDto): Promise<IAnswer> {

    const { mail, Form } = createAnswerDto;

    const formFound = await this.formSevice.findOneById(Form.id);
    if (!formFound) FormsExceptions.NOT_FOUND;

    const answerExists = await this.AnswerExists(formFound.id, createAnswerDto.mail);
    if (answerExists) AnswersExceptions.ALREADY_EXISTS;

    try {
      return await this.prismaService.answers.create({
        data: {
          mail: mail,
          form: {
            connect: {
              id: formFound.id
            }
          }
        },
        select: {
          ...selectAnswers
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<IAnswer[]> {
    return await this.prismaService.answers.findMany({
      select: {
        ...selectAnswers
      }
    });
  }

  async findOneByFormAndMail(form_id: string, mail: string): Promise<IAnswer> {
    try {
      const answer = await this.prismaService.answers.findUnique({
        where: {
          mail_form_id: {
            mail: mail,
            form_id: form_id
          }
        },
        select: {
          ...selectAnswers
        }
      });
      if (!answer) AnswersExceptions.NOT_FOUND;
      return answer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<IAnswer> {
    try {
      const answer = await this.prismaService.answers.findUnique({
        where: {
          id: id
        },
        select: {
          ...selectAnswers
        }
      })
      if (!answer) AnswersExceptions.NOT_FOUND;
      return answer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }


  async update(id: string, updateAnswerDto: UpdateAnswersDto) {
    const answer = await this.findOneByFormAndMail(id, updateAnswerDto.mail);
    if (!answer) AnswersExceptions.NOT_FOUND;

    try {
      return this.prismaService.answers.update({
        where: {
          mail_form_id: {
            mail: updateAnswerDto.mail,
            form_id: id
          }
        },
        data: {
          mail: updateAnswerDto.mail
        },
        select: {
          ...selectAnswers
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string) {

    const answer = await this.findOne(id);
    if (!answer) AnswersExceptions.NOT_FOUND;
    try {
      return this.prismaService.answers.delete({
        where: {
          id: id
        },
        select: {
          ...selectAnswers
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
