import { Injectable } from '@nestjs/common';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { UpdateTreatmentOptionDto } from './dto/update-treatment-option.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TreatmentOptionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTreatmentOptionDto: CreateTreatmentOptionDto) {
    return this.prisma.treatmentOption.create({
      data: createTreatmentOptionDto,
    });
  }

  findAll() {
    return this.prisma.treatmentOption.findMany();
  }

  findOne(id: number) {
    return this.prisma.treatmentOption.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTreatmentOptionDto: UpdateTreatmentOptionDto) {
    return this.prisma.treatmentOption.update({
      where: { id },
      data: updateTreatmentOptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.treatmentOption.delete({
      where: { id },
    });
  }
}
