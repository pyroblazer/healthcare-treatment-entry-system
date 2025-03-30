import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { AuthGuard } from '../auth/auth.guard';

describe('TreatmentController', () => {
  let controller: TreatmentController;

  const mockTreatmentService = {
    createTreatment: jest.fn(),
    listTreatments: jest.fn(),
    getTreatmentById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const dummyTreatment = {
    id: 'treat-123',
    patientName: 'John Doe',
    patientId: 'pat-456',
    dateOfTreatment: new Date().toISOString(),
    treatmentDescriptions: ['description 1'],
    medicationsPrescribed: ['med 1'],
    treatmentCost: 100.5,
    notes: 'some notes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentController],
      providers: [
        {
          provide: TreatmentService,
          useValue: mockTreatmentService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TreatmentController>(TreatmentController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTreatment', () => {
    it('should create and return a treatment', async () => {
      const dto: CreateTreatmentDto = {
        patientName: 'John Doe',
        patientId: 'pat-456',
        dateOfTreatment: new Date(),
        treatmentDescriptions: ['desc'],
        medicationsPrescribed: ['med 1'],
        treatmentCost: 100.5,
        notes: 'notes',
      };

      mockTreatmentService.createTreatment.mockResolvedValue(dummyTreatment);

      const result = await controller.createTreatment(dto);
      expect(result).toEqual(dummyTreatment);
      expect(mockTreatmentService.createTreatment).toHaveBeenCalledWith(dto);
    });
  });

  describe('listTreatments', () => {
    it('should return paginated treatments', async () => {
      const page = '1';
      const limit = '10';
      const expected = {
        treatments: [dummyTreatment],
        totalPages: 1,
        currentPage: 1,
      };

      mockTreatmentService.listTreatments.mockResolvedValue(expected);

      const result = await controller.listTreatments(page, limit);
      expect(result).toEqual(expected);
      expect(mockTreatmentService.listTreatments).toHaveBeenCalledWith(
        parseInt(page, 10),
        parseInt(limit, 10),
      );
    });
  });

  describe('getTreatmentById', () => {
    it('should return a treatment by id', async () => {
      mockTreatmentService.getTreatmentById.mockResolvedValue(dummyTreatment);

      const result = await controller.getTreatmentById('treat-123');
      expect(result).toEqual(dummyTreatment);
      expect(mockTreatmentService.getTreatmentById).toHaveBeenCalledWith(
        'treat-123',
      );
    });
  });

  describe('update', () => {
    it('should update and return the treatment', async () => {
      const updateDto: UpdateTreatmentDto = {
        notes: 'Updated notes',
      };

      const updatedTreatment = { ...dummyTreatment, ...updateDto };

      mockTreatmentService.update.mockResolvedValue(updatedTreatment);

      const result = await controller.update('treat-123', updateDto);
      expect(result).toEqual(updatedTreatment);
      expect(mockTreatmentService.update).toHaveBeenCalledWith(
        'treat-123',
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove the treatment', async () => {
      const removeResult = { message: 'Treatment deleted successfully' };

      mockTreatmentService.remove.mockResolvedValue(removeResult);

      const result = await controller.remove('treat-123');
      expect(result).toEqual(removeResult);
      expect(mockTreatmentService.remove).toHaveBeenCalledWith('treat-123');
    });
  });
});
