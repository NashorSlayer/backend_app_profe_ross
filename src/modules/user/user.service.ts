import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = this.hashPassword(createUserDto.password);
    console.log("hashed_password:", hashedPassword?.toString());
    const user = await this.prisma.users.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword?.toString()
      }
    });
    return user
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
    return await this.prisma.users.update({
      where: {
        id: id
      },
      data: updateUserDto
    });
  }

  async remove(id: string) {
    const user = await this.prisma.users.delete({
      where: {
        id: id
      }
    })
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: "User deleted successfully"
    // }
    return user;
  }
}
