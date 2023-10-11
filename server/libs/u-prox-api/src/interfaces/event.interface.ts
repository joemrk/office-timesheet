import { AdditionalField } from './additional-field.interface';
import { Department } from './department.interface';
import { Device } from './device.interface';
import { Message } from './message.interface';
import { Sender } from './sender.interface';
import { User } from './user.interface';

export interface Event {
  readonly AdditionalFields: AdditionalField[];
  readonly CardCode: string;
  readonly Department: Department;
  readonly Device: Device;
  readonly EventFilterPassed: boolean;
  readonly FaceMaskDetected: boolean;
  readonly IconToken: number;
  Issued: number;
  readonly Message: Message;
  readonly ModificationStatus: number;
  readonly PhotoToken: number;
  readonly PhotoverificationFiltersPassed: boolean[];
  readonly Sender: Sender;
  readonly Temperature: number;
  readonly Token: number;
  readonly User: User;
}
