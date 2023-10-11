import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UProxApiModule } from '@app/u-prox-api';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbValidationSchema } from './db/confgi.validation';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './db/constants';
import { join } from 'path';
import { TimesheetModule } from './timesheet/timesheet.module';
import * as Joi from 'joi';
import { appValidationSchema } from './config/confgi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ...appValidationSchema,
        ...dbValidationSchema,
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASS),
        database: configService.get<string>(DB_NAME),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UProxApiModule,
    EmployeeModule,
    TimesheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
