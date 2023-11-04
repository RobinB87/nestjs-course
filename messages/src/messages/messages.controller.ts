import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  list() {}

  @Get('/:id')
  one(@Param('id') id: string) {
    console.log(id);
  }

  @Post()
  create(@Body() body: CreateMessageDto) {
    console.log(body);
  }
}
