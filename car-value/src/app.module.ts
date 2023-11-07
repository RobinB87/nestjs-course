import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Report, User],
      synchronize: true, // auto migration: only for use in dev
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
export class AppModule {}
