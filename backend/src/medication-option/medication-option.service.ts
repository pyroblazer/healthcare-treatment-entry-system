import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMedicationOptionDto } from './dto/create-medication-option.dto';
import { UpdateMedicationOptionDto } from './dto/update-medication-option.dto';

@Injectable()
export class MedicationOptionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMedicationOptionDto: CreateMedicationOptionDto) {
    return this.prisma.medicationOption.create({
      data: createMedicationOptionDto,
    });
  }

  findAll() {
    return this.prisma.medicationOption.findMany();
  }

  findOne(id: number) {
    return this.prisma.medicationOption.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMedicationOptionDto: UpdateMedicationOptionDto) {
    return this.prisma.medicationOption.update({
      where: { id },
      data: updateMedicationOptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.medicationOption.delete({
      where: { id },
    });
  }
}
