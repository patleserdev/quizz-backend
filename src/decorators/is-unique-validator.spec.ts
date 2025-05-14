import { IsUniqueConstraint } from './is-unique.validator';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';// Adapte selon ta structure

describe('IsUniqueValidator', () => {
  let validator: IsUniqueConstraint;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUniqueConstraint,
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(), // Mock la méthode query
          },
        },
      ],
    }).compile();

    validator = module.get<IsUniqueConstraint>(IsUniqueConstraint);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should return true if email is unique', async () => {
    const mockResult = [{ count: '0' }];
    dataSource.query = jest.fn().mockResolvedValue(mockResult);
    
    // Création d'un objet ValidationArguments complet
    const args = {
      value: 'newemail@example.com',  // La valeur du champ à valider
      targetName: 'Users',             // Le nom de la classe cible (ici Users)
      object: { email: 'newemail@example.com' },  // L'objet entier à valider
      property: 'email',              // Le nom de la propriété à valider
      constraints: ['users', 'email'], // Les contraintes, comme la table et la colonne
    };

    const result = await validator.validate(args.value, args);
    expect(result).toBe(true);
  });

  it('should return false if email is not unique', async () => {
    const mockResult = [{ count: '1' }];
    dataSource.query = jest.fn().mockResolvedValue(mockResult);

    // Création d'un objet ValidationArguments complet
    const args = {
      value: 'existingemail@example.com',
      targetName: 'User',
      object: { email: 'existingemail@example.com' },
      property: 'email',
      constraints: ['users', 'email'],
    };

    const result = await validator.validate(args.value, args);
    expect(result).toBe(false);
  });
});
