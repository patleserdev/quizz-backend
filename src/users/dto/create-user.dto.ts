import { IsEmail, IsNotEmpty, MinLength,IsOptional,IsBoolean } from 'class-validator';
import { IsUnique } from '../../decorators/is-unique.validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsUnique( 'users', 'email',1 )
  email!: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur', minLength: 8 })
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @ApiProperty({ description: 'Précise si l\'utilisateur est administrateur'})
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
