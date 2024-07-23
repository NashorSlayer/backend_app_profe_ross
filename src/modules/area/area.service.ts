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

  private async findAreaByName(name: string): Promise<areas> {
    return await this.prisma.areas.findFirst({
      where: { name: name }
    });
  }

  async create(createAreaDto: CreateAreaDto): Promise<areas> {
    const area = await this.findAreaByName(createAreaDto.name);
    if (area) throw new BadRequestException('Area already exists');
    return await this.prisma.areas.create({
      data: { name: createAreaDto.name }
    });
  }

  async findAll(): Promise<areas[]> {
    return await this.prisma.areas.findMany();
  }

  async findOne(id: string): Promise<areas> {
    return await this.prisma.areas.findUnique({
      where: { id: id }
    })
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const areaFound = await this.findOne(id);
    if (!areaFound) throw new BadRequestException('Area not found');
    console.log("🚀 ~ AreaService ~ update ~ areaFound:", areaFound)
    return await this.prisma.areas.update({
      where: { id: areaFound.id },
      data: { ...updateAreaDto }
    });
  }

  async remove(id: string): Promise<areas> {
    return await this.prisma.areas.delete({
      where: { id: id }
    });
  }

}
