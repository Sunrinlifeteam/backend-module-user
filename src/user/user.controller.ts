import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StringValue } from 'google.protobuf';
import { UserEntity } from 'src/shared/access/user.dao';
import { CreateUser, User } from 'src/shared/transfer/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'getUserById')
  async getUserById(id: StringValue): Promise<User> {
    const user = await this.userService.getUserById(id);
    Logger.log(user, 'UserController');
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      department: user.department,
      grade: user.grade,
      class: user.class,
      number: user.number,
      accountType: user.accountType,
      role: user.role,
      description: user.description,
      githubLink: user.githubLink,
      image: user.image,
      backgroundImage: user.backgroundImage,
      clubId: 0, // user.clubId,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
    };
  }

  @GrpcMethod('UserService', 'createUser')
  async createUser(user: CreateUser): Promise<UserEntity> {
    console.log(user);
    return await this.userService.createUser(user);
  }
}
