import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

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
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('filter') filter?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : undefined;
    const limitNumber = limit ? parseInt(limit, 10) : undefined;

    return await this.treatmentService.listTreatments(
      pageNumber,
      limitNumber,
      filter,
    );
  }

  @Get(':id')
  async getTreatmentById(@Param('id') id: string) {
    return await this.treatmentService.getTreatmentById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentService.remove(id);
  }
}
