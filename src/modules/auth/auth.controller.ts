import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('SigIn')
  async SigIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.SigIn(signInUserDto);
  }

  @Post('SigUp')
  async SigUp(@Body() body: any) {
    return this.authService.SigUp();
  }

}
