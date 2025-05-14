import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 = salt rounds
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.usersRepository.save(user);
  }

  async findAll() {
    const users = await this.usersRepository.find({
      select: {
        username: true,
        email: true,
        // ❌ pas de password
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('Aucun utilisateur trouvée');
    }
    return users;
  }

  async findOne(id?: number, username?: string, email?: string) {
    const filter: any = {};

    if (id) filter.id = id;
    if (username) filter.username = username;
    if (email) filter.email = email.toLowerCase();

    const user = await this.usersRepository.findOneBy(filter);

    if (!user) {
      throw new NotFoundException('Aucune utilisateur trouvé');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10); // 10 = salt rounds
    const user = this.usersRepository.update(id, {
      ...updateUserDto,
      password: hashedPassword,
    });
    return await user;
  }

  remove(id: number) {
    const user = this.usersRepository.delete(id);

    return user;
  }
}
