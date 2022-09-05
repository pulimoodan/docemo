import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsArray()
  productsArray: any[];

  @IsBoolean()
  paid: boolean = false;

  @IsString()
  paymentType: string;

  @IsString()
  paymentCurrency: string;

  @IsString()
  paymentId?: string;
}
