import { Controller, Req, Get, Post, Body, Patch, Param, Delete, HttpCode, Header, HttpStatus } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Req() req: Request) {
    return await this.areaService.findAll();
  }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.areaService.findOne(id);
  }
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return await this.areaService.update(id, updateAreaDto);
  }
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.areaService.remove(id);
  }
}
