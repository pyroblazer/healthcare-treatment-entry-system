import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentService {
  private readonly logger = new Logger('TreatmentService');

  constructor(private prisma: PrismaService) {}

  async createTreatment(dto: CreateTreatmentDto) {
    this.logger.log(
      `Creating treatment record for patientId: ${dto.patientId}`,
    );

    const treatment = await this.prisma.treatment.create({
      data: {
        ...dto,
        dateOfTreatment: new Date(dto.dateOfTreatment),
        treatmentCost: new Decimal(dto.treatmentCost),
      },
    });

    this.logger.log(`Treatment record created for patientId: ${dto.patientId}`);

    return treatment;
  }

  async listTreatments(page?: number, limit?: number) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const treatments = await this.prisma.treatment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
      const total = await this.prisma.treatment.count();
      return {
        treatments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    } else {
      const treatments = await this.prisma.treatment.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return {
        treatments,
        totalPages: 1,
        currentPage: 1,
      };
    }
  }

  async getTreatmentById(id: string) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id },
    });
    if (!treatment) {
      throw new NotFoundException('Treatment not found');
    }
    return treatment;
  }

  update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    return this.prisma.treatment.update({
      where: { id },
      data: updateTreatmentDto,
    });
  }

  remove(id: string) {
    return this.prisma.treatment.delete({
      where: { id },
    });
  }
}
