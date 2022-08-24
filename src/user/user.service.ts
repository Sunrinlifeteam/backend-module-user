import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringValue } from 'google.protobuf';
import { UserEntity } from 'src/shared/access/user.dao';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById({ value: id }: StringValue): Promise<UserEntity> {
    const users = await this.userRepository.count();

    Logger.log(users, 'UserService');
    Logger.log(`UserService.getUserById: ${id}`, 'UserService');
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
