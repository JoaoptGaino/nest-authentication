import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: "'name' is required" })
  @IsString({ message: "'name' must be a string" })
  name: string;
}
