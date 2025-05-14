import { IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateCategoryDto {
  
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  isActive: boolean;
}
