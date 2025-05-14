import { Test, TestingModule } from '@nestjs/testing';
import { BddService } from './bdd.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity'; // adapte ce chemin si nécessaire
import { Repository } from 'typeorm';
describe('BddService', () => {
  let service: BddService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute d'autres méthodes que BddService utilise
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BddService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<BddService>(BddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
