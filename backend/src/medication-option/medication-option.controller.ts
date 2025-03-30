import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationOptionService } from './medication-option.service';
import { CreateMedicationOptionDto } from './dto/create-medication-option.dto';
import { UpdateMedicationOptionDto } from './dto/update-medication-option.dto';

@Controller('medication-option')
export class MedicationOptionController {
  constructor(
    private readonly medicationOptionService: MedicationOptionService,
  ) {}

  @Post()
  create(@Body() createMedicationOptionDto: CreateMedicationOptionDto) {
    return this.medicationOptionService.create(createMedicationOptionDto);
  }

  @Get()
  findAll() {
    return this.medicationOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationOptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicationOptionDto: UpdateMedicationOptionDto,
  ) {
    return this.medicationOptionService.update(+id, updateMedicationOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationOptionService.remove(+id);
  }
}
