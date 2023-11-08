import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import this setting in every module
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ReportsModule,
  ],
  providers: [
    {
      provide: APP_PIPE, // setup global pipe
      useValue: new ValidationPipe({
        whitelist: true, // strip additional properties which are not in dto, so users cannot add additional properties
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*'); // use this middleware in every request that flows in the entire application
  }
}
