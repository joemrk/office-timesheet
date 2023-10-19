import { Body, Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Employee } from './employee.entity';
import { EmployeeCreate } from './dto/employee-create.dto';

@Crud({
  model: { type: Employee },
  routes: {
    only: ['getManyBase', 'createOneBase'],
  },
})
@Controller('employee')
export class EmployeeController implements CrudController<Employee> {
  constructor(public service: EmployeeService) {}

  get base(): CrudController<Employee> {
    return this;
  }

  @Override('getManyBase')
  async getMany() {
    return this.service.findAll();
  }

  @Override('createOneBase')
  createOne(@ParsedRequest() req: CrudRequest, @Body() dto: EmployeeCreate) {
    return this.base.createOneBase(req, dto as Employee);
  }
}
