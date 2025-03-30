import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentOptionDto } from './create-treatment-option.dto';

export class UpdateTreatmentOptionDto extends PartialType(
  CreateTreatmentOptionDto,
) {}
