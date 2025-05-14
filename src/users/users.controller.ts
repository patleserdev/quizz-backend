import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' }) // Description de l'action
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste des utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [CreateUserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Objet utilisateur', type: [CreateUserDto] })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modification des champs utilisateur' })
  @ApiResponse({ status: 200, description: 'Objet utilisateur', type: [CreateUserDto] })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Suppression d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Objet utilisateur', type: [CreateUserDto] })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
