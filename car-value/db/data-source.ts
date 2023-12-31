import { DataSource, DataSourceOptions } from 'typeorm';

const dbOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './db/db.sqlite.dev',
  entities: ['**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    break;
  case 'test':
    Object.assign(dbOptions, {
      type: 'sqlite',
      database: './db/db.sqlite.test',
      entities: ['**/*.entity.ts'],
      migrationsRun: true, // run migrations when running
    });
    break;
  case 'production':
    Object.assign({
      type: 'postgres',
      url: process.env.DATABASE_URL, // set by heroku
      migrationsRun: true,
      entities: ['dist/db/migrations/*.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment: ' + process.env.NODE_ENV);
}

export const dataSourceOptions: DataSourceOptions = dbOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
