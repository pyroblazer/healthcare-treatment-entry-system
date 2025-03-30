import { Test, TestingModule } from '@nestjs/testing';
import { MedicationOptionController } from './medication-option.controller';
import { MedicationOptionService } from './medication-option.service';
import { CreateMedicationOptionDto } from './dto/create-medication-option.dto';
import { UpdateMedicationOptionDto } from './dto/update-medication-option.dto';

describe('MedicationOptionController', () => {
  let controller: MedicationOptionController;
  let service: MedicationOptionService;

  beforeEach(async () => {
    const mockMedicationOptionService = {
      create: jest.fn((dto: CreateMedicationOptionDto) => ({ id: 1, ...dto })),
      findAll: jest.fn(() => [
        { id: 1, name: 'Antibiotics', description: 'For infection' },
        { id: 2, name: 'Pain Relievers', description: 'For pain' },
      ]),
      findOne: jest.fn((id: number) => ({
        id,
        name: 'Antibiotics',
        description: 'For infection',
      })),
      update: jest.fn((id: number, dto: UpdateMedicationOptionDto) => ({
        id,
        ...dto,
      })),
      remove: jest.fn((id: number) => ({ id })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationOptionController],
      providers: [
        {
          provide: MedicationOptionService,
          useValue: mockMedicationOptionService,
        },
      ],
    }).compile();

    controller = module.get<MedicationOptionController>(
      MedicationOptionController,
    );
    service = module.get<MedicationOptionService>(MedicationOptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a medication option', async () => {
    const createDto: CreateMedicationOptionDto = {
      name: 'Antibiotics',
      description: 'For infection',
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({ id: 1, ...createDto });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should return all medication options', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Antibiotics', description: 'For infection' },
      { id: 2, name: 'Pain Relievers', description: 'For pain' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one medication option by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({
      id: 1,
      name: 'Antibiotics',
      description: 'For infection',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a medication option', async () => {
    const updateDto: UpdateMedicationOptionDto = {
      description: 'For severe infection',
    };
    const result = await controller.update('1', updateDto);
    expect(result).toEqual({ id: 1, ...updateDto });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove a medication option', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
