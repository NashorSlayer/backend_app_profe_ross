import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/signin-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async SigIn(signInUserDto: SignInUserDto): Promise<{ access_token: string }> {
        const userFound = await this.userService.getUserByEmail(signInUserDto.email);
        if (!userFound) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(signInUserDto.password, userFound.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password');
        }
        const payload = {
            sub: userFound.id,
            username: userFound.email
        }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }


    async SigUp() {
        return 'This action returns all cats';
    }
}
