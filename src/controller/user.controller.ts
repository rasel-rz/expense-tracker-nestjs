import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response,
  SetMetadata,
} from '@nestjs/common';
import { AuthResponse } from 'src/interface/auth.response';
import { UserModel } from 'src/model';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
const NoAuth = () => SetMetadata('no-auth', true);

@NoAuth()
@Controller()
export class UserController {
  constructor(
    private readonly service: UserService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() model: UserModel): Promise<AuthResponse> {
    const user = await this.service.findByUsername(model.username);
    if (!user) return { message: 'User not found!', token: '' };
    const passwordMatch = bcrypt.compareSync(model.password, user.password);
    if (!passwordMatch) return { message: "Password didn't match!", token: '' };
    const token = this.jwtService.sign(user.id, {
      secret: process.env.JWT_SECRET,
    });
    return { message: 'Login Successfull!', token };
  }

  @Post('signin')
  async singin(@Body() model: UserModel): Promise<AuthResponse> {
    model.password = bcrypt.hashSync(model.password, 10);
    const user = await this.service.create(model);
    const token = this.jwtService.sign(user.id, {
      secret: process.env.JWT_SECRET,
    });
    return { message: 'Account created successfully!', token };
  }
}
