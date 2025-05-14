import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;
}
