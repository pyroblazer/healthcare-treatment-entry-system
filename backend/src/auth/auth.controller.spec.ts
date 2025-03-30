import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    signup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with correct parameters and return token', async () => {
      const dto: SignupDto = {
        email: 'user@example.com',
        password: 'securePassword',
      };

      const mockResponse = {
        accessToken: 'signup.jwt.token',
        user: { id: 1, email: dto.email },
      };

      mockAuthService.signup.mockResolvedValue(mockResponse);

      const result = await controller.signup(dto);

      expect(authService.signup).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters and return token', async () => {
      const email = 'user@example.com';
      const password = 'securePassword';

      const mockResponse = {
        accessToken: 'login.jwt.token',
        user: { id: 1, email },
      };

      mockAuthService.login.mockResolvedValue(mockResponse);

      const result = await controller.login(email, password);

      expect(authService.login).toHaveBeenCalledWith(email, password);
      expect(result).toEqual(mockResponse);
    });
  });
});
