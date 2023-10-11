import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Employee } from './employee.entity';

@Crud({
  model: { type: Employee },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('employee')
export class EmployeeController implements CrudController<Employee> {
  constructor(public service: EmployeeService) {}

  get base(): CrudController<Employee> {
    return this;
  }
}
