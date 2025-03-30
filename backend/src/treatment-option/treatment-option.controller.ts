import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentOptionService } from './treatment-option.service';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { UpdateTreatmentOptionDto } from './dto/update-treatment-option.dto';

@Controller('treatment-option')
export class TreatmentOptionController {
  constructor(
    private readonly treatmentOptionService: TreatmentOptionService,
  ) {}

  @Post()
  create(@Body() createTreatmentOptionDto: CreateTreatmentOptionDto) {
    return this.treatmentOptionService.create(createTreatmentOptionDto);
  }

  @Get()
  findAll() {
    return this.treatmentOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentOptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentOptionDto: UpdateTreatmentOptionDto,
  ) {
    return this.treatmentOptionService.update(+id, updateTreatmentOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentOptionService.remove(+id);
  }
}
