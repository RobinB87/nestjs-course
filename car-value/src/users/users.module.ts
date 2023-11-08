import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [AuthService, UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
