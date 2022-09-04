import { IsString, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  per: string;

  @IsArray()
  features: string[];

  @IsBoolean()
  active: boolean = false;
}