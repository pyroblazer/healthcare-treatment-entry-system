import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('treatments')
@UseGuards(AuthGuard)
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  async createTreatment(@Body() dto: CreateTreatmentDto) {
    return await this.treatmentService.createTreatment(dto);
  }

  @Get()
  async listTreatments(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return await this.treatmentService.listTreatments(page, limit);
  }

  @Get(':id')
  async getTreatmentById(@Param('id') id: string) {
    return await this.treatmentService.getTreatmentById(id);
  }
}
