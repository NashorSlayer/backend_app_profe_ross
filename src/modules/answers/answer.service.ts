import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async create(createAnswerDto: CreateAnswersDto) {
    const areaFound = await this.areaService.findAreaByName(createAnswerDto.Area.name);
    if (!areaFound) throw new BadRequestException('Area not found');

    const formFound = await this.formSevice.findOne(createAnswerDto.Form.id);
    if (!formFound) throw new BadRequestException('Form not found');

    try {
      return await this.prismaService.answers.create({
        data: {
          time: createAnswerDto.time,
          area: {
            connect: {
              id: areaFound.id
            }
          },
          forms: {
            connect: {
              id: formFound.id
            }
          }
        },
        select: {
          time: true,
          area: {
            select: {
              name: true
            }
          },
          forms: {
            select: {
              title: true
            }
          }
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return await this.prismaService.answers.findMany({
      select: {
        time: true,
        area: {
          select: {
            name: true
          }
        },
        forms: {
          select: {
            id: true,
          }
        }
      }
    });
  }
  async remove(id: string) {
    const answer = await this.findOne(id);
    if (!answer) throw new BadRequestException('Answer not found');
    try {
      return this.prismaService.answers.delete({
        where: {
          id: id
        },
        select: {
          time: true,
          area: {
            select: {
              name: true
            }
          },
          forms: {
            select: {
              title: true
            }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const answer = await this.prismaService.answers.findUnique({
        where: {
          id: id
        },
        select: {
          time: true,
          area: {
            select: {
              name: true
            }
          },
          forms: {
            select: {
              title: true
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

  async findAnswersByIdForm(id: string) {
    const formFound = await this.formSevice.findOne(id);
    if (!formFound) throw new BadRequestException('Form not found');
    try {
      return await this.prismaService.answers.findMany({
        where: {
          forms: {
            id: formFound.id
          }
        },
        select: {
          time: true,
          area: {
            select: {
              name: true
            }
          },
          forms: {
            select: {
              title: true
            }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, updateAnswerDto: UpdateAnswersDto) {

  }


}
