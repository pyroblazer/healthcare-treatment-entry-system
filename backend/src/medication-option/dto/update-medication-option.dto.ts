import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationOptionDto } from './create-medication-option.dto';

export class UpdateMedicationOptionDto extends PartialType(
  CreateMedicationOptionDto,
) {}
