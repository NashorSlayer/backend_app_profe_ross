import { Injectable } from '@nestjs/common';
import { CreateSurveysAreaDto } from './dto/create-surveys_area.dto';
import { UpdateSurveysAreaDto } from './dto/update-surveys_area.dto';

@Injectable()
export class SurveysAreasService {
  create(createSurveysAreaDto: CreateSurveysAreaDto) {
    return 'This action adds a new surveysArea';
  }

  findAll() {
    return `This action returns all surveysAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveysArea`;
  }

  update(id: number, updateSurveysAreaDto: UpdateSurveysAreaDto) {
    return `This action updates a #${id} surveysArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveysArea`;
  }
}
