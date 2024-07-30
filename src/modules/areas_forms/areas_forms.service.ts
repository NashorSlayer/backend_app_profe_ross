import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAreasFormsDto } from './dto/create-areas_forms.dto';
import { UpdateAreasFormsDto } from './dto/update-areas_forms.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AreaService } from '../area/area.service';
import { FormService } from '../forms/forms.service';
import { IAreasForm } from 'src/interfaces/interface';

@Injectable()
export class AreasFormsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly formService: FormService,
  ) { }


  async findAreaByNameInForm(name: string): Promise<any> {
    const areaFound = await this.areaService.findAreaByName(name);
    if (!areaFound) throw new BadRequestException('Area not found');

    try {
      return await this.prismaService.areas_forms.findFirst({
        where: {
          area: {
            name: areaFound.name
          }
        },
        include: {
          area: true,
          forms: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
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

  async create(createAreasFormsDto: CreateAreasFormsDto): Promise<IAreasForm> {
    const areaFound = await this.areaService.findAreaByName(createAreasFormsDto.Area.name);
    if (!areaFound) throw new BadRequestException('Area not found');

    const formFound = await this.formService.findOne(createAreasFormsDto.Form.id);
    if (!formFound) throw new BadRequestException('Form not found');

    try {
      const AreaFormCreated = await this.prismaService.areas_forms.create({
        data: {
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
        include: {
          area: true,
          forms: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
                }
              }
            }
          }
        }
      });
      return {
        area: AreaFormCreated.area,
        form: AreaFormCreated.forms,
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.prismaService.areas_forms.findMany(
      {
        include: {
          area: {
            select: {
              name: true
            }
          },
          forms: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
                }
              }
            },
          },
        },
      });
  }

  async findAreasByFormId(id: string) {
    const formFound = await this.formService.findOne(id);
    if (!formFound) throw new BadRequestException('Form not found');

    return this.prismaService.areas_forms.findMany({
      where: {
        forms: {
          id: formFound.id
        },
      },
      select: {
        area: {
          select: {
            name: true
          }
        },
      }
    });
  }

  async update(id: string, UpdateAreasFormsDto: UpdateAreasFormsDto) {


  }

  async removeOneAreaFromForm(id: string, area: string) {
    const formFound = await this.formService.findOne(id);
    if (!formFound) throw new BadRequestException('Form not found');


    const areasFound = await this.areaService.findAreaByName(area);
    if (!areasFound) throw new BadRequestException('Areas not found');

    try {
      return null
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
