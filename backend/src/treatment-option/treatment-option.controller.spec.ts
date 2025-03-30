import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentOptionController } from './treatment-option.controller';
import { TreatmentOptionService } from './treatment-option.service';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { UpdateTreatmentOptionDto } from './dto/update-treatment-option.dto';

describe('TreatmentOptionController', () => {
  let controller: TreatmentOptionController;
  let service: TreatmentOptionService;

  const mockTreatmentOptionService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [
      { id: 1, name: 'Radiation', description: 'For cancer treatment' },
      { id: 2, name: 'Chemotherapy', description: 'For cancer treatment' },
    ]),
    findOne: jest.fn((id) => {
      if (id === 1) {
        return {
          id: 1,
          name: 'Radiation',
          description: 'For cancer treatment',
        };
      }
      return null;
    }),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentOptionController],
      providers: [
        {
          provide: TreatmentOptionService,
          useValue: mockTreatmentOptionService,
        },
      ],
    }).compile();

    controller = module.get<TreatmentOptionController>(
      TreatmentOptionController,
    );
    service = module.get<TreatmentOptionService>(TreatmentOptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a treatment option', async () => {
    const createDto: CreateTreatmentOptionDto = {
      name: 'Radiation',
      description: 'For cancer treatment',
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({ id: 1, ...createDto });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should return all treatment options', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Radiation', description: 'For cancer treatment' },
      { id: 2, name: 'Chemotherapy', description: 'For cancer treatment' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one treatment option by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({
      id: 1,
      name: 'Radiation',
      description: 'For cancer treatment',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a treatment option', async () => {
    const updateDto: UpdateTreatmentOptionDto = {
      description: 'For advanced cancer treatment',
    };
    const result = await controller.update('1', updateDto);
    expect(result).toEqual({ id: 1, ...updateDto });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove a treatment option', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
