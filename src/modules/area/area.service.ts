import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Areas } from '@prisma/client';

@Injectable()
export class AreaService {

  constructor(
    private prisma: PrismaService,
  ) { }

  private async findAreaByName(name: string): Promise<Areas> {
    return await this.prisma.areas.findFirst({
      where: { name: name }
    });
  }

  async create(createAreaDto: CreateAreaDto): Promise<Areas> {
    const area = await this.findAreaByName(createAreaDto.name);
    if (area) throw new BadRequestException('Area already exists');
    return await this.prisma.areas.create({
      data: { name: createAreaDto.name }
    });
  }

  async findAll(): Promise<Areas[]> {
    return await this.prisma.areas.findMany();
  }

  async findOne(id: string): Promise<Areas> {
    return await this.prisma.areas.findUnique({
      where: { id: id }
    })
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    return await this.prisma.areas.update({
      where: { id: id },
      data: { ...updateAreaDto }
    });
  }

  async remove(id: string): Promise<Areas> {
    return await this.prisma.areas.delete({
      where: { id: id }
    });
  }

}
