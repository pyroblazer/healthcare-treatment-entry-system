import { Test, TestingModule } from '@nestjs/testing';
import { MedicationOptionService } from './medication-option.service';
import { PrismaService } from '../prisma.service';

describe('MedicationOptionService', () => {
  let service: MedicationOptionService;
  let prismaService: PrismaService;

  // Mock PrismaService methods
  const mockPrismaService = {
    medicationOption: {
      create: jest.fn((dto) => ({ id: 1, ...dto.data })),
      findMany: jest.fn(() => [
        { id: 1, name: 'Antibiotics', description: 'For infection' },
        { id: 2, name: 'Pain Relievers', description: 'For pain' },
      ]),
      findUnique: jest.fn((args) => {
        if (args.where.id === 1) {
          return { id: 1, name: 'Antibiotics', description: 'For infection' };
        }
        return null; // Simulate no result for any other id
      }),
      update: jest.fn((dto) => ({ id: dto.where.id, ...dto.data })),
      delete: jest.fn((args) => {
        if (args.where.id === 1) {
          return { id: 1 };
        }
        return null; // Simulate deletion failure for any other id
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationOptionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MedicationOptionService>(MedicationOptionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a medication option', async () => {
    const createDto = { name: 'Antibiotics', description: 'For infection' };
    const result = await service.create(createDto);
    expect(result).toEqual({ id: 1, ...createDto });
    expect(prismaService.medicationOption.create).toHaveBeenCalledWith({
      data: createDto,
    });
  });

  it('should return all medication options', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Antibiotics', description: 'For infection' },
      { id: 2, name: 'Pain Relievers', description: 'For pain' },
    ]);
    expect(prismaService.medicationOption.findMany).toHaveBeenCalled();
  });

  it('should return one medication option by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      name: 'Antibiotics',
      description: 'For infection',
    });
    expect(prismaService.medicationOption.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a medication option', async () => {
    const updateDto = { description: 'For severe infection' };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({ id: 1, ...updateDto });
    expect(prismaService.medicationOption.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  it('should remove a medication option', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id: 1 });
    expect(prismaService.medicationOption.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
