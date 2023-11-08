import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    const dbLocation = join(__dirname, '..', 'db/db.sqlite.test');
    await rm(dbLocation);
  } catch (e) {
    // do nothing
  }
});
