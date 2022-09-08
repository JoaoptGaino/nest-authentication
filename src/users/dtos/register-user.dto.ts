import { IsNotEmpty, IsString, Min } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: "'name' is required" })
  @IsString({ message: "'name' must be a string" })
  name: string;

  @IsNotEmpty({ message: "'username' is required" })
  @IsString({ message: "'username' must be a string" })
  username: string;

  @IsNotEmpty({ message: "'email' is required" })
  @IsString({ message: "'email' must be a string" })
  email: string;

  @IsNotEmpty({ message: "'password' is required" })
  @IsString({ message: "'password' must be a string" })
  @Min(6, { message: "'password' must have min 6 characters" })
  password: string;
}
