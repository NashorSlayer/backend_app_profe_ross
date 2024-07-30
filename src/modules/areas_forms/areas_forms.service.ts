import { Injectable } from '@nestjs/common';
import { CreateAreasFormsDto } from './dto/create-areas_forms.dto';
import { UpdateAreasFormsDto } from './dto/update-areas_forms.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AreaService } from '../area/area.service';
import { FormService } from '../forms/forms.service';

@Injectable()
export class AreasFormsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly areaService: AreaService,
    private readonly formService: FormService,
  ) { }

  create(createSurveysAreaDto: CreateAreasFormsDto) {
    const areaFound = this.areaService.findOne(createSurveysAreaDto.Area.id);
    if (!areaFound) throw new Error('Area not found');
    const surveyFound = this.formService.findOne(createSurveysAreaDto.Form.id);
    if (!surveyFound) throw new Error('Survey not found');
    return this.prismaService.areas_forms.create({
      data: {
        area: {
          connect: {
            id: createSurveysAreaDto.Area.id
          }
        },
        forms: {
          connect: {
            id: createSurveysAreaDto.Form.id
          }
        }
      },
      include: {
        area: true,
        forms: true,
      }
    });
  }

  findAll() {
    return this.prismaService.areas_forms.findMany(
      {
        include: {
          area: true,
          forms: true,
        }
      }
    );
  }

  findOne(id: string) {
    return this.prismaService.areas_forms.findUnique({
      where: { id: id },
      include: {
        area: true,
        forms: true,
      }
    });
  }

  async update(id: string, UpdateAreasFormsDto: UpdateAreasFormsDto) {

    const areaFound = await this.areaService.findOne(UpdateAreasFormsDto.Area.id);
    if (!areaFound) throw new Error('Area not found');
    return await this.prismaService.areas_forms.update({
      where: { id: id },
      data: {
        area: {
          connect: {
            id: areaFound.id
          }
        },
      },
      include: {
        area: true,
        forms: true,
      }
    });
  }

  async remove(id: string) {
    return await this.prismaService.areas_forms.delete({
      where: { id: id },
      include: {
        area: true,
        forms: true,
      }
    });
  }
}
