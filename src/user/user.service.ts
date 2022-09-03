import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringValue } from 'google/protobuf/wrappers';
import { UserEntity } from 'shared/lib/access/user.dao';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: string): Promise<UserEntity> {
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

  async updateUser(
    id: string,
    user: DeepPartial<UserEntity>,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }
}
