import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.areaService.findAll();
  }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string, @Body() form_id: string) {
    return await this.areaService.findOne(form_id, id);
  }
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return await this.areaService.update(id, updateAreaDto);
  }
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() form_id: string) {
    return await this.areaService.remove(form_id, id);
  }

}
