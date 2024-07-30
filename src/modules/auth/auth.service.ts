import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(signInUserDto: SignInUserDto): Promise<any> {
        const userFound = await this.userService.getUserByEmail(signInUserDto.email);
        if (!userFound) throw new UnauthorizedException('User not found');

        const passwordMatch = await bcrypt.compare(signInUserDto.password, userFound.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid password');
        const payload = {
            sub: userFound.id,
            username: userFound.username,
        };
        const access_token = await this.jwtService.signAsync(payload)
        return { user: { ...userFound }, access_token: access_token };

    }


    async signUp(signUpUserDto: SignUpUserDto) {
        const userFound = await this.userService.UserExistByEmail(signUpUserDto.email);
        if (userFound) throw new BadRequestException('User already exists');
        try {
            return await this.userService.create(signUpUserDto);
        } catch (error) {
            throw new BadRequestException(error.message)

        }
    }
}
