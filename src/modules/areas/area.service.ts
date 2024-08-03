import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FormService } from '../forms/forms.service';
import { IArea } from 'src/interfaces/interface';
import { selectAreas } from '../../querys/area.query';
import { AreasExceptions, FormsExceptions } from 'src/utils/exceptions';

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

  async findAreaByName(form_id: string, name: string): Promise<IArea> {
    const formFound = await this.formService.findOneById(form_id);
    if (!formFound) FormsExceptions.NOT_FOUND;
    try {
      return await this.prismaService.areas.findUnique({
        where: {
          name_form_id: {
            name: name,
            form_id: form_id
          }
        },
        select: {
          ...selectAreas
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createAreaDto: CreateAreaDto): Promise<IArea> {

    const formFound = await this.formService.findOneById(createAreaDto.Form.id);
    if (!formFound) FormsExceptions.NOT_FOUND;

    const area = await this.ExistsAreaByName(formFound.id, createAreaDto.name);
    if (area) AreasExceptions.ALREADY_EXISTS;

    try {
      return await this.prismaService.areas.create({
        data: {
          name: createAreaDto.name,
          form: {
            connect: {
              id: createAreaDto.Form.id
            }
          }
        },
        select: {
          ...selectAreas
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
          ...selectAreas
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async findOne(form_id: string, id: string): Promise<IArea> {
    const formFound = await this.formService.findOneById(form_id);
    if (!formFound) FormsExceptions.NOT_FOUND;

    try {
      const areaFound = await this.prismaService.areas.findUnique({
        where: { id: id },
        select: {
          ...selectAreas
        }
      })
      if (!areaFound) AreasExceptions.NOT_FOUND;
      return areaFound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<IArea> {
    const areaFound = await this.findOne(updateAreaDto.Form.id, id);
    if (!areaFound) AreasExceptions.NOT_FOUND;
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
          ...selectAreas
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(form_id: string, id: string): Promise<IArea> {
    const areaFound = await this.findOne(form_id, id);
    if (!areaFound) AreasExceptions.NOT_FOUND;
    try {
      return await this.prismaService.areas.delete({
        where: { id: id },
        select: {
          ...selectAreas
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
