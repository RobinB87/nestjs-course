import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  getOne(@Param('id') id: string) {
    console.log('handler is running');
    return this.usersService.findOne(+id);
  }

  @Get()
  getAllByEmail(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
