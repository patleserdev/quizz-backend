import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {

    const mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
       {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
