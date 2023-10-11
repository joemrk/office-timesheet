import { Event } from './event.interface';

export interface EventListResponse {
  Event: Event[];
  readonly Language: string;
  readonly NextToken: number;
  readonly UserSID: string;
}
