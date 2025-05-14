// is-unique.validator.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

interface IsUniqueOptions {
  tableName: string;
  column: string;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [tableName, column, excludeId] = args.constraints;

    // Construction de la requête générique
    const query = `SELECT COUNT(*) as count FROM \`${tableName}\` WHERE \`${column}\` = ? ${excludeId ? `AND id != ?` : ''}`;
    
    const parameters = excludeId ? [value, excludeId] : [value];
    
    // Exécution de la requête
    const result = await this.dataSource.query(query, parameters);
    return parseInt(result[0].count, 10) === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists in ${args.constraints[0]} with ${args.constraints[1]} column.`;
  }
}


export function IsUnique(tableName: string, column: string, excludeId?: number, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [tableName, column, excludeId],
      validator: IsUniqueConstraint,
    });
  };
}
