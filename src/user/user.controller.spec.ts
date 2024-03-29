import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return ""', () => {
      console.log(
        userController.getUserById({
          value: 'dc1db6a1-32b7-4f48-a87f-062613e3ffe7',
        }),
      );
    });
  });
});
