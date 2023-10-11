import { Controller } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Timesheet } from './timesheet.entity';

@Crud({
  model: { type: Timesheet },
  routes: {
    only: ['getManyBase', 'updateOneBase'],
  },
})
@Controller('timesheet')
export class TimesheetController implements CrudController<Timesheet> {
  constructor(public service: TimesheetService) {}

  get base(): CrudController<Timesheet> {
    return this;
  }
}
