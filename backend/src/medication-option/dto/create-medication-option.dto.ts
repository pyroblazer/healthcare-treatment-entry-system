import { IsString, IsOptional } from 'class-validator';

export class CreateMedicationOptionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
