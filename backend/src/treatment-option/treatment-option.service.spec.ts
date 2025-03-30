import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentOptionService } from './treatment-option.service';
import { PrismaService } from '../prisma.service';

describe('TreatmentOptionService', () => {
  let service: TreatmentOptionService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    treatmentOption: {
      create: jest.fn((dto) => ({ id: 1, ...dto.data })),
      findMany: jest.fn(() => [
        { id: 1, name: 'Radiation', description: 'For cancer treatment' },
        { id: 2, name: 'Chemotherapy', description: 'For cancer treatment' },
      ]),
      findUnique: jest.fn((args) => {
        if (args.where.id === 1) {
          return {
            id: 1,
            name: 'Radiation',
            description: 'For cancer treatment',
          };
        }
        return null;
      }),
      update: jest.fn((dto) => ({ id: dto.where.id, ...dto.data })),
      delete: jest.fn((args) => {
        if (args.where.id === 1) {
          return { id: 1 };
        }
        return null;
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreatmentOptionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TreatmentOptionService>(TreatmentOptionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a treatment option', async () => {
    const createDto = {
      name: 'Radiation',
      description: 'For cancer treatment',
    };
    const result = await service.create(createDto);
    expect(result).toEqual({ id: 1, ...createDto });
    expect(prismaService.treatmentOption.create).toHaveBeenCalledWith({
      data: createDto,
    });
  });

  it('should return all treatment options', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Radiation', description: 'For cancer treatment' },
      { id: 2, name: 'Chemotherapy', description: 'For cancer treatment' },
    ]);
    expect(prismaService.treatmentOption.findMany).toHaveBeenCalled();
  });

  it('should return one treatment option by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      name: 'Radiation',
      description: 'For cancer treatment',
    });
    expect(prismaService.treatmentOption.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a treatment option', async () => {
    const updateDto = { description: 'For advanced cancer treatment' };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({ id: 1, ...updateDto });
    expect(prismaService.treatmentOption.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  it('should remove a treatment option', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id: 1 });
    expect(prismaService.treatmentOption.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
