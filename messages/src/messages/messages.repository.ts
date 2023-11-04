import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
  async findOne(id: string) {
    const messages = await this.getFiles();
    return messages[id];
  }

  async findAll() {
    return await this.getFiles();
  }

  async create(content: string) {
    const messages = await this.getFiles();
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }

  private async getFiles() {
    const contents = await readFile('messages.json', 'utf8');
    return JSON.parse(contents);
  }
}
