import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
    });
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Aucune catégorie trouvée');
    }

    return categories;
  }

  async findOne(id?: number, name?: string) {
    const filter: any = {};

    if (id) filter.id = id;
    if (name) filter.name = name;

    const category = await this.categoryRepository.findOneBy(filter);
    if (!category) {
      throw new NotFoundException('Aucune catégorie trouvée');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryRepository.update(id, {
      ...updateCategoryDto,
    });
    return await category;
  }

  remove(id: number) {
    const category = this.categoryRepository.delete(id);

    return category;
  }
}
