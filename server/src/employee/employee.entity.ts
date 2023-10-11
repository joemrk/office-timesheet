import { BaseEntity } from 'src/db/base.entity';
import { Timesheet } from 'src/timesheet/timesheet.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Event } from '@app/u-prox-api/interfaces';

@Entity()
export class Employee extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  firstName: string;

  @Column('varchar', { length: 255, nullable: false })
  lastName: string;

  @Column('varchar', { length: 255, nullable: true, default: null })
  department: string;

  @Column('varchar', { length: 255, nullable: true, default: null })
  position: string;

  @Column('varchar', { length: 255, nullable: false })
  cardId: string;

  @OneToMany(() => Timesheet, (t) => t.employee)
  timesheet: Timesheet[];

  events?: Event[];
}
