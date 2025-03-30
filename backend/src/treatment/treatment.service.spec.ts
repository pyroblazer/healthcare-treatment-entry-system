import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentService } from './treatment.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

describe('TreatmentService', () => {
  let service: TreatmentService;

  const mockPrismaService = {
    treatment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const dummyTreatment = {
    id: 'treat-123',
    patientName: 'John Doe',
    patientId: 'pat-456',
    dateOfTreatment: new Date(),
    treatmentDescriptions: ['description 1'],
    medicationsPrescribed: ['med 1'],
    treatmentCost: new Decimal(100.5),
    notes: 'some notes',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreatmentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TreatmentService>(TreatmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTreatment', () => {
    it('should create a treatment record and return it', async () => {
      mockPrismaService.treatment.create.mockResolvedValue(dummyTreatment);

      const result = await service.createTreatment({
        patientName: 'John Doe',
        patientId: 'pat-456',
        dateOfTreatment: new Date(),
        treatmentDescriptions: ['desc'],
        medicationsPrescribed: ['med 1'],
        treatmentCost: 100.5,
        notes: 'notes',
      });

      expect(result).toEqual(dummyTreatment);
      expect(mockPrismaService.treatment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          patientName: 'John Doe',
          patientId: 'pat-456',
          dateOfTreatment: expect.any(Date),
          treatmentDescriptions: ['desc'],
          medicationsPrescribed: ['med 1'],
          treatmentCost: new Decimal(100.5),
          notes: 'notes',
        }),
      });
    });
  });

  describe('listTreatments', () => {
    it('should return a paginated list of treatments', async () => {
      const page = 1;
      const limit = 10;
      const expected = {
        treatments: [dummyTreatment],
        totalPages: 1,
        currentPage: 1,
      };

      mockPrismaService.treatment.findMany.mockResolvedValue([dummyTreatment]);
      mockPrismaService.treatment.count.mockResolvedValue(1);

      const result = await service.listTreatments(page, limit);

      expect(result).toEqual(expected);
      expect(mockPrismaService.treatment.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(mockPrismaService.treatment.count).toHaveBeenCalled();
    });
  });

  describe('getTreatmentById', () => {
    it('should return a treatment by id', async () => {
      mockPrismaService.treatment.findUnique.mockResolvedValue(dummyTreatment);

      const result = await service.getTreatmentById('treat-123');

      expect(result).toEqual(dummyTreatment);
      expect(mockPrismaService.treatment.findUnique).toHaveBeenCalledWith({
        where: { id: 'treat-123' },
      });
    });

    it('should throw NotFoundException if treatment is not found', async () => {
      mockPrismaService.treatment.findUnique.mockResolvedValue(null);

      await expect(service.getTreatmentById('treat-123')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getTreatmentById('treat-123')).rejects.toThrow(
        'Treatment not found',
      );
    });
  });

  describe('update', () => {
    it('should update a treatment record and return it', async () => {
      const updateData = {
        notes: 'updated notes',
      };
      const updatedTreatment = {
        ...dummyTreatment,
        ...updateData,
      };

      mockPrismaService.treatment.update.mockResolvedValue(updatedTreatment);

      const result = await service.update('treat-123', updateData);

      expect(result).toEqual(updatedTreatment);
      expect(mockPrismaService.treatment.update).toHaveBeenCalledWith({
        where: { id: 'treat-123' },
        data: updateData,
      });
    });
  });

  describe('remove', () => {
    it('should delete a treatment record and return it', async () => {
      mockPrismaService.treatment.delete.mockResolvedValue(dummyTreatment);

      const result = await service.remove('treat-123');

      expect(result).toEqual(dummyTreatment);
      expect(mockPrismaService.treatment.delete).toHaveBeenCalledWith({
        where: { id: 'treat-123' },
      });
    });
  });
});
