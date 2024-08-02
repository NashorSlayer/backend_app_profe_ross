import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswersDto } from './dto/create-answers.dto';
import { UpdateAnswersDto } from './dto/update-answers.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @Post()
  create(@Body() createAnswerDto: CreateAnswersDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() mail: string) {
    return this.answerService.findOne(id, mail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerAreaDto: UpdateAnswersDto) {
    return this.answerService.update(id, updateAnswerAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() mail: string) {
    return this.answerService.remove(id, mail);
  }
}
