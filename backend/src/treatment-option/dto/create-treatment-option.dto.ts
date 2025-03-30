import { IsString, IsOptional } from 'class-validator';

export class CreateTreatmentOptionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
