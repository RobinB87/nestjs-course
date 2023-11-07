import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import this setting in every module
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [Report, User],
          synchronize: true, // auto migration: only for use in dev
        };
      },
    }),
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['adsfasdf'],
        }),
      )
      .forRoutes('*'); // use this middleware in every request that flows in the entire application
  }
}
