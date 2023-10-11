import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { md5 } from './util/md5';
import {
  U_PROX_API_LOGIN_INTERVAL,
  U_PROX_API_PASS,
  U_PROX_API_PASS_HASH_PHRASE,
  U_PROX_API_USER,
} from './config/constants';
import { AuthResponse } from './interfaces/auth-response.interface';
import { EventListResponse } from './interfaces/event-list-response.interface';
import { convertEventTime } from './util/get-time-from-event';

@Injectable()
export class UProxApiService implements OnModuleInit {
  private http: AxiosInstance;
  private sessionId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.http = httpService.axiosRef;
  }

  async onModuleInit() {
    await this.login();

    const loginInterval = this.configService.get<number>(
      U_PROX_API_LOGIN_INTERVAL,
    );
    if (loginInterval > 0) {
      setInterval(async () => {
        await this.login();
      }, loginInterval * 1000);
    }
  }

  private hashPassword(): string {
    return md5(
      md5(
        md5(this.configService.get<string>(U_PROX_API_PASS)) +
          this.configService.get<string>(U_PROX_API_PASS_HASH_PHRASE),
      ),
    );
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.http.request<T>(config)).data;
    } catch (error) {
      console.log(error?.response);
      throw error;
    }
  }

  private async login() {
    const auth = await this.auth();
    if (auth.UserSID) {
      this.sessionId = auth.UserSID;
    }
  }

  private async auth(): Promise<AuthResponse> {
    const config: AxiosRequestConfig = {
      url: '/Authenticate',
      method: 'post',
      data: {
        PasswordHash: this.hashPassword(),
        UserName: this.configService.get<string>(U_PROX_API_USER),
      },
    };

    return this.request<AuthResponse>(config);
  }

  async eventGetListV2(from: number): Promise<EventListResponse> {
    const config: AxiosRequestConfig = {
      url: '/EventGetListV2',
      method: 'post',
      data: {
        IssuedFrom: `/Date(${from})/`, // from
        Language: 'en',
        Limit: 1000, // 0 - all, negative - count in DESC sort, positive - count in ASC sort
        StartToken: 0,
        UserSID: this.sessionId,
      },
    };

    const response = await this.request<EventListResponse>(config);
    response.Event = response.Event.map((e) => {
      e.Issued = convertEventTime(e.Issued);
      return e;
    });

    return response;
  }
}
