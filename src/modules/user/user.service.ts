import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/interface';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const userFound = await this.prisma.users.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true
      }
    });
    if (!userFound) throw new BadRequestException('User does not exist');
    return userFound;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const userExists = await this.getUserByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: hashedPassword
        },
        select: {
          id: true,
          email: true,
          username: true,
        }
      });
      return user;
    }
  }

  async findAll(): Promise<IUser[]> {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      }
    });
  }

  async findOne(id: string): Promise<IUser> {
    const userFound = await this.prisma.users.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    });
    if (!userFound) throw new BadRequestException('User does not exist');
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserByEmail(updateUserDto.email);
    if (!user) throw new BadRequestException('User does not exist');

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    return await this.prisma.users.update({
      where: {
        id: id
      },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
      }
    });
  }

  async remove(id: string): Promise<IUser> {
    const userFound = await this.findOne(id);
    if (!userFound) throw new BadRequestException('User does not exist');
    const user = await this.prisma.users.delete({
      where: {
        id: userFound.id
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    })
    return user;
  }
}
