import { MessagesRepository } from './messages.repository';

export class MessagesService {
  private messagesRepo: MessagesRepository;

  constructor() {
    // In real apps we use DI
    this.messagesRepo = new MessagesRepository();
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    this.messagesRepo.create(content);
  }
}
