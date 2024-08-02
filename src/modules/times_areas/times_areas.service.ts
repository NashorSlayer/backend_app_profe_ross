import { Injectable } from '@nestjs/common';
import { CreateTimesAreaDto } from './dto/create-times_area.dto';
import { UpdateTimesAreaDto } from './dto/update-times_area.dto';

@Injectable()
export class TimesAreasService {
  create(createTimesAreaDto: CreateTimesAreaDto) {
    return 'This action adds a new timesArea';
  }

  findAll() {
    return `This action returns all timesAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timesArea`;
  }

  update(id: number, updateTimesAreaDto: UpdateTimesAreaDto) {
    return `This action updates a #${id} timesArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesArea`;
  }
}
