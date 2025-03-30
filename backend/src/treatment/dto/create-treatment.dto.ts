import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsDateString()
  dateOfTreatment: Date;

  @IsArray()
  @ArrayNotEmpty()
  treatmentDescriptions: string[];

  @IsArray()
  @IsOptional()
  medicationsPrescribed?: string[];

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'treatmentCost must be a non-negative number' })
  treatmentCost: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
