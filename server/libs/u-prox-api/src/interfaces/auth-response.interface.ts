import { Credentials } from './credentials.interface';
export interface AuthResponse {
  readonly Credentials: Credentials;
  readonly Language: string;
  readonly UserSID: string;
  readonly UserToken: number;
}
