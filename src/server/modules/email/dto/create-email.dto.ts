import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsEmail()
  user: string;

  @IsString()
  password: string;

  @IsEmail()
  from: string;

  @IsEmail()
  to: string;
}
