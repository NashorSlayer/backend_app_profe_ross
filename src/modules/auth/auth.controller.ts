import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { SignUpUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async SigIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async SigUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile() {
    return this.userService.findAll();
  }
}
