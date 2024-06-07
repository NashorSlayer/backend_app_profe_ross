import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerAreasService } from './answer_areas.service';
import { CreateAnswerAreaDto } from './dto/create-answer_area.dto';
import { UpdateAnswerAreaDto } from './dto/update-answer_area.dto';

@Controller('answer-areas')
export class AnswerAreasController {
  constructor(private readonly answerAreasService: AnswerAreasService) {}

  @Post()
  create(@Body() createAnswerAreaDto: CreateAnswerAreaDto) {
    return this.answerAreasService.create(createAnswerAreaDto);
  }

  @Get()
  findAll() {
    return this.answerAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerAreaDto: UpdateAnswerAreaDto) {
    return this.answerAreasService.update(+id, updateAnswerAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerAreasService.remove(+id);
  }
}
