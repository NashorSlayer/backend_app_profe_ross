import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { areas } from '@prisma/client';
import { FormService } from '../forms/forms.service';
import { IArea } from 'src/interfaces/interface';

@Injectable()
export class AreaService {

  constructor(
    private prismaService: PrismaService,
    private formService: FormService
  ) { }

  async ExistsAreaByName(form_id: string, name: string): Promise<boolean> {
    const areaFound = await this.prismaService.areas.findUnique({
      where: {
        name_form_id: {
          name: name,
          form_id: form_id
        }
      }
    });
    if (areaFound) return true;
    return false;
  }

  async findAreaByName(form_id: string, name: string): Promise<areas> {
    const formFound = await this.formService.findOneById(form_id);
    if (!formFound) throw new BadRequestException('Form not found');
    try {
      return await this.prismaService.areas.findUnique({
        where: {
          name_form_id: {
            name: name,
            form_id: form_id
          }
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createAreaDto: CreateAreaDto): Promise<areas> {

    const formFound = await this.formService.findOneById(createAreaDto.Form.id);
    if (!formFound) throw new BadRequestException('Form not found');

    const area = await this.ExistsAreaByName(formFound.id, createAreaDto.name);
    if (area) throw new BadRequestException('Area already exists');

    try {
      return await this.prismaService.areas.create({
        data: {
          name: createAreaDto.name,
          form: {
            connect: {
              id: createAreaDto.Form.id
            }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async findAll(): Promise<IArea[]> {
    try {
      return await this.prismaService.areas.findMany({
        select: {
          name: true,
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
      throw new InternalServerErrorException(error.message);
    }

  }

  async findOne(form_id: string, id: string): Promise<IArea> {

    const formFound = await this.formService.findOneById(form_id);
    if (!formFound) throw new BadRequestException('Form not found');

    try {
      const areaFound = await this.prismaService.areas.findUnique({
        where: { id: id },
        select: {
          name: true,
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
      if (!areaFound) throw new BadRequestException('Area not found');
      return areaFound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<IArea> {
    const areaFound = await this.findOne(updateAreaDto.Form.id, id);
    if (!areaFound) throw new BadRequestException('Area not found');
    try {
      return await this.prismaService.areas.update({
        where: {
          id: areaFound.id,
          form_id: updateAreaDto.Form.id
        },
        data: {
          name: updateAreaDto.name
        },
        select: {
          name: true,
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
      throw new BadRequestException(error.message);
    }
  }

  async remove(form_id: string, id: string): Promise<IArea> {
    const areaFound = await this.findOne(form_id, id);
    if (!areaFound) throw new BadRequestException('Area not found');
    try {
      return await this.prismaService.areas.delete({
        where: { id: id },
        select: {
          name: true,
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
