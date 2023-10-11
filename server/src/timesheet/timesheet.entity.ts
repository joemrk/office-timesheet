import { BaseEntity } from 'src/db/base.entity';
import { Employee } from 'src/employee/employee.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TimesheetStatus } from './timesheet-status.enum';
import { decimalToNumberTransformer } from 'src/util/transformers/decimalToNumberTransformer';

@Entity()
export class Timesheet extends BaseEntity {
  @Column('int')
  employeeId: number;

  @ManyToOne(() => Employee, (e) => e.timesheet)
  employee: Employee;

  // @Column('decimal', {
  //   default: 0,
  //   precision: 10,
  //   scale: 2,
  //   transformer: decimalToNumberTransformer(),
  // })
  // workTime: number; // calculated time by evens

  @Column('varchar', { default: '0' })
  absoluteWorkTime: string; // time between first event and last

  @Column({
    type: 'enum',
    enum: TimesheetStatus,
    default: TimesheetStatus.MISSING,
  })
  status: TimesheetStatus;

  @Column('timestamp')
  startWorkTime: Date;

  @Column('timestamp')
  endWorkTime: Date;
}
