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
