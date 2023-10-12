import { Injectable, OnModuleInit } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getStartOfMonth } from 'src/util/datatime';

@Injectable()
export class EmployeeService extends TypeOrmCrudService<Employee> {
  constructor(@InjectRepository(Employee) repo: Repository<Employee>) {
    super(repo);
  }

  async findAll() {
    return this.find({
      where: {
        createdAt: MoreThan(new Date(getStartOfMonth())),
      },
      relations: ['timesheet'],
    });
  }
}
