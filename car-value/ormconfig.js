const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite.test',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment: ' + process.env.NODE_ENV);
}

module.exports = dbConfig;
