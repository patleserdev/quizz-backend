import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUnique } from '../../decorators/is-unique.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsUnique('users', 'email', 1)
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
