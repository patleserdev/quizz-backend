import { Controller, Get } from '@nestjs/common';
import { BddService } from '../bdd/bdd.service';

@Controller('api')
export class ApiController {
  constructor(private readonly BddService: BddService) {}
  @Get()
  getApi(): string {
    return this.BddService.getCategories();
  }
}
