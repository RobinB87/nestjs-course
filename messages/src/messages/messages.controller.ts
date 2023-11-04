import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  list() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async one(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) throw new NotFoundException('message not found');
    return message;
  }

  @Post()
  create(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
