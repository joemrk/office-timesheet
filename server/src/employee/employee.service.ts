import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class EmployeeService extends TypeOrmCrudService<Employee> {
  constructor(@InjectRepository(Employee) repo: Repository<Employee>) {
    super(repo);
  }
}
