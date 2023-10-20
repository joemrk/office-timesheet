import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Timesheet } from './timesheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { UProxApiService } from '@app/u-prox-api';
import { getStartOfDay } from 'src/util/datatime';
import { Event } from '@app/u-prox-api/interfaces';
import { Employee } from 'src/employee/employee.entity';
import { TimesheetStatus } from './timesheet-status.enum';
import { getTimeByHour } from 'src/util/get-time-by-hour';
import { ConfigService } from '@nestjs/config';
import {
  END_WORK_TIME,
  OVERTIME_TIME,
  START_WORK_TIME,
  LATENESS_TIME,
} from 'src/config/constants';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

@Injectable()
export class TimesheetService extends TypeOrmCrudService<Timesheet> {
  constructor(
    @InjectRepository(Timesheet) repo: Repository<Timesheet>,
    private readonly employeeService: EmployeeService,
    private readonly uProxService: UProxApiService,
    private readonly configService: ConfigService,
  ) {
    super(repo);
  }

  async onModuleInit() {
    await this.generateDaysTimesheet();
  }

  async generateDaysTimesheet() {
    const employeess = await this.getEmployeesWithEvents();

    await this.saveTimesheet(
      employeess.map((e) => this.generateTimesheetByEmployee(e)),
    );
  }

  private generateTimesheetByEmployee(employee: Employee): Timesheet {
    const timesheet = new Timesheet();
    timesheet.employeeId = employee.id;
    timesheet.status = this.getStatusByEvents(employee.events);

    if (!employee.events) {
      return timesheet;
    }

    const firstEventTime = employee.events[0].Issued;
    const lastEventTime = employee.events[employee.events.length - 1].Issued;

    timesheet.startWorkTime = new Date(firstEventTime);
    timesheet.endWorkTime = new Date(lastEventTime);
    timesheet.absoluteWorkTime = this.getAbsoluteWorkTime(
      firstEventTime,
      lastEventTime,
    );

    return timesheet;
  }

  private async saveTimesheet(timesheets: Timesheet[]): Promise<void> {
    const employeesIds = timesheets.map((e) => e.employeeId);

    const todaysTimesheets = await this.find({
      where: {
        employeeId: In(employeesIds),
        createdAt: MoreThan(new Date(getStartOfDay())),
      },
      select: ['id', 'employeeId'],
    });

    if (!todaysTimesheets.length) {
      this.repo.save(timesheets);
      return;
    }

    const mappedByEmployee = new Map();

    todaysTimesheets.forEach((t) => {
      mappedByEmployee.set(t.employeeId, t.id);
    });

    const toSave = timesheets.map((t) => {
      if (mappedByEmployee.has(t.employeeId)) {
        t.id = mappedByEmployee.get(t.employeeId);
      }
      return t;
    });

    this.repo.upsert(toSave, ['id']);
  }

  private async getEmployeesWithEvents(): Promise<Employee[]> {
    const employees = await this.employeeService.find();
    if (!employees.length) {
      return;
    }

    const startOfDay = getStartOfDay();
    const events = await this.uProxService.eventGetListV2(startOfDay);

    const eventsMap: Record<string, Array<Event>> = {};

    events.Event.forEach((e) => {
      if (!eventsMap[e.CardCode]) {
        Object.assign(eventsMap, { [e.CardCode]: [e] });
      } else {
        eventsMap[e.CardCode].push(e);
      }
    });

    return employees.map((e) => {
      Object.assign(e, { events: eventsMap[e.cardId] });
      return e;
    });
  }

  private getAbsoluteWorkTime(
    firsEventTime: number,
    lastEventTime: number,
  ): string {
    const startAt = dayjs(firsEventTime);
    const endAt = dayjs(lastEventTime);

    const workTime = dayjs.duration(endAt.diff(startAt));

    return `${workTime.hours()}h ${workTime.minutes()}m`;
  }

  private getStatusByEvents(events: Event[]): TimesheetStatus {
    if (!events?.length) {
      return TimesheetStatus.MISSING;
    }

    const startWorkTime = getTimeByHour(
      this.configService.get<number>(START_WORK_TIME),
    );

    if (
      events[0].Issued >
      this.configService.get<number>(LATENESS_TIME) + startWorkTime
    ) {
      return TimesheetStatus.LATENESS;
    }

    const endWorkTime = getTimeByHour(
      this.configService.get<number>(END_WORK_TIME),
    );

    if (
      events[events.length - 1].Issued >
      this.configService.get<number>(OVERTIME_TIME) + endWorkTime
    ) {
      return TimesheetStatus.OVERTIME;
    }

    return TimesheetStatus.PRESENT;
  }
}
