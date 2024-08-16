import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interface';
import { UserExceptions } from 'src/utils/exceptions';
import { selectUser, selectUserWithPassword } from '../../querys/user.query';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async UserExistByEmail(email: string): Promise<boolean> {
    const userFound = await this.prisma.users.findFirst({
      where: {
        email: email
      }
    });
    if (userFound) return true;
    return false;
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const userFound = await this.prisma.users.findUnique({
      where: {
        email: email
      },
      select: {
        ...selectUserWithPassword
      }
    });
    if (!userFound) UserExceptions.NOT_FOUND;
    return userFound;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const userExists = await this.UserExistByEmail(createUserDto.email);
    if (userExists) {
      UserExceptions.ALREADY_EXISTS;
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: hashedPassword
        },
        select: {
          ...selectUser
        }
      });
      return user;
    }
  }

  async findAll(): Promise<IUser[]> {
    return await this.prisma.users.findMany({
      select: {
        ...selectUser
      }
    });
  }

  async findOne(id: string): Promise<IUser> {
    const userFound = await this.prisma.users.findUnique({
      where: {
        id: id
      },
      select: {
        ...selectUser
      }
    });
    if (!userFound) throw new BadRequestException('User does not exist');
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByEmail(updateUserDto.email);
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
        ...selectUser
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
        ...selectUser
      }
    })
    return user;
  }
}
