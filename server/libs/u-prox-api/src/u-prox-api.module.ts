import { Module } from '@nestjs/common';
import { UProxApiService } from './u-prox-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.validation';
import { U_PROX_API_URL } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>(U_PROX_API_URL),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UProxApiService],
  exports: [UProxApiService],
})
export class UProxApiModule {}
