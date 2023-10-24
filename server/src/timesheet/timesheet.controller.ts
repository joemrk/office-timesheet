import { Body, Controller, Post } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Timesheet } from './timesheet.entity';
import { TimesheetSet } from './dto/timesheet-set.dto';

@Crud({
  model: { type: Timesheet },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('timesheet')
export class TimesheetController implements CrudController<Timesheet> {
  constructor(public service: TimesheetService) {}

  get base(): CrudController<Timesheet> {
    return this;
  }

  @Post()
  setTimesheetDay(@Body() body: TimesheetSet) {
    return this.service.setTimesheetDay(body);
  }
}
