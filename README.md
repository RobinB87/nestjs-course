# Initialize the local directory as a Git repository.
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main

# Setup NestJS
1. devcontainer with node
2. npm init -y
3. npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata typescript

4. create a tsconfig.json
Especially experimentalDecorators and emitDecoratorMetadata are really important for NestJS to work.

