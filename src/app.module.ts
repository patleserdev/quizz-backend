import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { BddService } from './bdd/bdd.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { IsUniqueConstraint } from './decorators/is-unique.validator';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // modifie selon ton utilisateur
      password: '', // modifie selon ton mot de passe
      database: 'nest_test', // crée cette base ou change le nom
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // ⚠️ à désactiver en prod
      logging: true,
      logger: 'advanced-console',
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, BddService, IsUniqueConstraint,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // Configuration de class-validator pour utiliser Nest container
    // ⬇️ Important !
    import('class-validator').then((cv) => {
      cv.useContainer(AppModule as any, { fallbackOnErrors: true });
    });
  }

}
