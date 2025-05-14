import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // ajoute les méthodes nécessaires
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
