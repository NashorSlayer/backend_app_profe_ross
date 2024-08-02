import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAnswersDto } from './dto/create-answers.dto';
import { UpdateAnswersDto } from './dto/update-answers.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FormService } from '../forms/forms.service';
import { IAnswer } from 'src/interfaces/interface';

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
    const formFound = await this.formSevice.findOneById(createAnswerDto.Form.id);
    if (!formFound) throw new BadRequestException('Form not found');

    const answerExists = await this.AnswerExists(formFound.id, createAnswerDto.mail);
    if (answerExists) throw new BadRequestException('Answer already exists');

    try {
      return await this.prismaService.answers.create({
        data: {
          mail: createAnswerDto.mail,
          form: {
            connect: {
              id: formFound.id
            }
          }
        },
        select: {
          mail: true,
          form: {
            select: {
              title: true,
              description: true,
              date_start: true,
              date_end: true,
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          },
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<IAnswer[]> {
    return await this.prismaService.answers.findMany({
      select: {
        mail: true,
        form: {
          select: {
            title: true,
            description: true,
            date_start: true,
            date_end: true,
            user: {
              select: {
                email: true,
                username: true
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: string, mail: string): Promise<IAnswer> {
    try {
      const answer = await this.prismaService.answers.findUnique({
        where: {
          mail_form_id: {
            mail: mail,
            form_id: id
          }
        },
        select: {
          mail: true,
          form: {
            select: {
              title: true,
              description: true,
              date_start: true,
              date_end: true,
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          }
        }
      });
      if (!answer) throw new BadRequestException('Answer not found');
      return answer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async update(id: string, updateAnswerDto: UpdateAnswersDto) {
    const answer = await this.findOne(id, updateAnswerDto.mail);
    if (!answer) throw new BadRequestException('Answer not found');

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
          mail: true,
          form: {
            select: {
              title: true,
              description: true,
              date_start: true,
              date_end: true,
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          }
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string, title: string) {
    const answer = await this.findOne(id, title);
    if (!answer) throw new BadRequestException('Answer not found');
    try {
      return this.prismaService.answers.delete({
        where: {
          id: id
        },
        select: {
          form: {
            select: {
              title: true,
              description: true,
              date_start: true,
              date_end: true,
              user: {
                select: {
                  email: true,
                  username: true
                }
              }
            }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
