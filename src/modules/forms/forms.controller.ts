import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FormService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createSurveyDto: CreateFormDto) {
    return this.formService.create(createSurveyDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateFormDto) {
    return this.formService.update(id, updateSurveyDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }
}