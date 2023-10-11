import { AdditionalField } from './additional-field.interface';
import { Name } from './name.interface';

export interface Entity extends Name {
  readonly AdditionalFields: AdditionalField[];
  readonly EmployeeNumber: string;
  readonly Post: string;
}
