import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TimesheetStatus } from '../timesheet-status.enum';

export class TimesheetSet {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  employeeId: number;

  @IsDateString()
  createdAt: string;

  @IsEnum(TimesheetStatus)
  status: TimesheetStatus;

  @IsOptional()
  @IsDate()
  startWorkTime?: Date;

  @IsOptional()
  @IsDate()
  endWorkTime?: Date;

  @IsOptional()
  @IsString()
  absoluteWorkTime?: string;
}
