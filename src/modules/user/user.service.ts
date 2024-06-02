import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id: id
      },
      data: updateUserDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
