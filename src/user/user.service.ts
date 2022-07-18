import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/access/user.dao';
import { GetUserById } from 'src/shared/transfer/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById({ id }: GetUserById): Promise<UserEntity> {
    const users = await this.userRepository.count();

    Logger.log(users, 'UserService');
    Logger.log(`UserService.getUserById: ${id}`, 'UserService');
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
