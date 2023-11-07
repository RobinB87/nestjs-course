import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({ id, email: 'bla@bla.com', password: '123' } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: '123' } as User]),
      update: () => Promise.resolve({} as User),
      remove: () => Promise.resolve({} as User),
    };

    fakeAuthService = {
      signup: () => Promise.resolve({} as User),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllByEmail - should return all users with a given email', async () => {
    const users = await controller.getAllByEmail('bla@bla.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('bla@bla.com');
  });

  it('getOne - should return a single user with the given id', async () => {
    const user = await controller.getOne('5');
    expect(user).toBeDefined();
    expect(user.id).toEqual(5);
  });

  it('signin - should update session object and return user', async () => {
    const session = { userId: 0 };
    const user = await controller.signin(
      { email: 'bla@bla.com', password: '123' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
