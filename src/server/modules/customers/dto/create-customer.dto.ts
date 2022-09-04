import {
  IsEmail,
  IsString
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;

  @IsEmail()
  email: string;
}