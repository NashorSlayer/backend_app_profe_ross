import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesAreasService } from './times_areas.service';
import { CreateTimesAreaDto } from './dto/create-times_area.dto';
import { UpdateTimesAreaDto } from './dto/update-times_area.dto';

@Controller('times-areas')
export class TimesAreasController {
  constructor(private readonly timesAreasService: TimesAreasService) {}

  @Post()
  create(@Body() createTimesAreaDto: CreateTimesAreaDto) {
    return this.timesAreasService.create(createTimesAreaDto);
  }

  @Get()
  findAll() {
    return this.timesAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesAreaDto: UpdateTimesAreaDto) {
    return this.timesAreasService.update(+id, updateTimesAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesAreasService.remove(+id);
  }
}
