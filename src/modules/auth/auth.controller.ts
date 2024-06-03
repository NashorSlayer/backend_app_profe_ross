import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('SigIn')
  async SigIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.SigIn(signInUserDto);
  }

  @Post('SigUp')
  async SigUp(@Body() body: any) {
    return this.authService.SigUp();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile() {
    return this.userService.findAll();
  }
}
