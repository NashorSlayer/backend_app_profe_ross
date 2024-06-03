import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async getUserByEmail(email: string): Promise<Users> {
    return await this.prisma.users.findUnique({
      where: {
        email: email
      }
    });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const userExists = await this.getUserByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: hashedPassword
        }
      });
      return user;
    }
  }


  async findAll(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({
      where: {
        id: id
      }
    });

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserByEmail(updateUserDto.email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    return await this.prisma.users.update({
      where: {
        id: id
      },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password
      }
    });
  }

  async remove(id: string): Promise<Users> {
    const userFound = await this.prisma.users.findUnique({
      where: {
        id: id
      }
    });
    if (!userFound) {
      throw new BadRequestException('User does not exist');
    }
    const user = await this.prisma.users.delete({
      where: {
        id: id
      }
    })
    return user;
  }
}
