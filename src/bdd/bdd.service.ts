import { Injectable } from '@nestjs/common';
import { Users } from '../users/entities/user.entity'; // adapte ce chemin si nécessaire
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BddService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  getCategories(): string {
    return 'voici les catégories';
  }
}
