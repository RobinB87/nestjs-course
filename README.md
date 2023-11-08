# Scaffold without .git

nest new APP_NAME --skip-git

# Create files

nest generate module messages
nest g controller messages/messages --flat

# npm

1. npm i class-validator class-transformer
2. npm i --save @nestjs/typeorm typeorm mysql3
3. npm i class-validator class-transformer
4. npm i cookie-session @types/cookie-session
5. npm i @nestjs/config
6. npm i cross-env // works across different environments

after creating one to many relationship, update reports table:
UPDATE report SET userId = 1

# TypeORM migrations

https://typeorm.io/using-cli
https://typeorm.io/migrations

1. Create data source and import it
2. Refer to it in package json: "typeorm": ".."
3. Generate migration:
   npm run typeorm migration:generate db/migrations/migration-name

4. Run migration:
   npm run typeorm migration:run

5. Revert migration (if necessary)
   npm run typeorm:dev -- migration:revert

# Production

1. npm install pg (postgress)
2. set up heroku
   https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

# Heroku commands:

1. heroku create (create new heroku project)
2. heroku addons:create heroku-postgresql:hobby-dev (free hobby tier)
3. heroku config:set COOKY_KEY=asdflkasdjfasldkj (use some key)
4. git push heroku master (main?)
