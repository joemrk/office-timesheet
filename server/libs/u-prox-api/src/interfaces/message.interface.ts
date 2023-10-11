import { Name } from './name.interface';

export interface Message extends Name {
  readonly AccessGranted: boolean;
  readonly Code: number;
  readonly Color: number;
}
