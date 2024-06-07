import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveysAreasService } from './surveys_areas.service';
import { CreateSurveysAreaDto } from './dto/create-surveys_area.dto';
import { UpdateSurveysAreaDto } from './dto/update-surveys_area.dto';

@Controller('surveys-areas')
export class SurveysAreasController {
  constructor(private readonly surveysAreasService: SurveysAreasService) {}

  @Post()
  create(@Body() createSurveysAreaDto: CreateSurveysAreaDto) {
    return this.surveysAreasService.create(createSurveysAreaDto);
  }

  @Get()
  findAll() {
    return this.surveysAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveysAreaDto: UpdateSurveysAreaDto) {
    return this.surveysAreasService.update(+id, updateSurveysAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysAreasService.remove(+id);
  }
}
