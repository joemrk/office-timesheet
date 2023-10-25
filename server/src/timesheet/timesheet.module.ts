import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { UProxApiModule } from '@app/u-prox-api';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timesheet]),
    EmployeeModule,
    UProxApiModule,
    ConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService],
  exports: [TimesheetService],
})
export class TimesheetModule {}
