import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { BddService } from '../bdd/bdd.service';
describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: BddService,
          useValue: {
            // Ajoute ici les méthodes mockées dont ApiController dépend
            getSomething: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
