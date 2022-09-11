import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  stripe: string;

  @IsString()
  nowPayments: string;
}
