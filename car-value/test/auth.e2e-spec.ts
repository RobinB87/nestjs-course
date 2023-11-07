import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'testxzxUnique@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: '12345',
      })
      .expect(201)
      .then((res) => {
        const { id, email: emailFromBody } = res.body;
        expect(id).toBeDefined();
        expect(emailFromBody).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'testxzxUnique@test.com';

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: '12345',
      });

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
