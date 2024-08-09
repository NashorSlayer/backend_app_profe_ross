import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FormService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { GetFormDto } from './dto/get-form.dto';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/by-title-and-mail')
  findOneFormByTitleAndMail(@Body() getFormDto: GetFormDto) {
    const { title, email } = getFormDto;
    return this.formService.findOneByTitleAndMail(title, email);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }
}
