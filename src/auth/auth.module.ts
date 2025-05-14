import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service.js';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  controllers: [AuthController],
  providers: [AuthService,UsersService],
  imports: [UsersModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),],
  exports: [AuthService],
})
export class AuthModule {}
