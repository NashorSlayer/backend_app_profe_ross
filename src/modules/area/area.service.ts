import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { areas } from '@prisma/client';

@Injectable()
export class AreaService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async ExistsAreaByName(name: string): Promise<boolean> {
    const areaFound = await this.prisma.areas.findFirst({
      where: { name: name }
    });
    if (areaFound) return true;
    return false;
  }


  async findAreaByName(name: string): Promise<areas> {
    const areaFound = await this.prisma.areas.findUnique({
      where: { name: name }
    });
    if (!areaFound) throw new BadRequestException('Area not found');
    return areaFound;
  }

  async create(createAreaDto: CreateAreaDto): Promise<areas> {
    const area = await this.ExistsAreaByName(createAreaDto.name);
    if (area) throw new BadRequestException('Area already exists');
    try {
      return await this.prisma.areas.create({
        data: { name: createAreaDto.name }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async findAll(): Promise<areas[]> {
    return await this.prisma.areas.findMany();
  }

  async findOne(id: string): Promise<areas> {
    const areaFound = await this.findOne(id);
    if (!areaFound) throw new BadRequestException('Area not found');
    try {
      return await this.prisma.areas.findUnique({
        where: { id: id }
      })
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const areaFound = await this.findOne(id);
    if (!areaFound) throw new BadRequestException('Area not found');
    try {
      return await this.prisma.areas.update({
        where: { id: areaFound.id },
        data: { name: updateAreaDto.name }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<areas> {
    const areaFound = await this.findOne(id);
    if (!areaFound) throw new BadRequestException('Area not found');
    try {
      return await this.prisma.areas.delete({
        where: { id: id }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
