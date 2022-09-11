import { IsString } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  currency: string;

  @IsString()
  baseUrl: string;
}
