import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { Decimal } from '@prisma/client/runtime/library';

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

  async listTreatments(page: number = 1, limit: number = 10) {
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
}
