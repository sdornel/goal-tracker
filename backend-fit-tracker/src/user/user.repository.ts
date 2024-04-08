import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
  async findByName(name: string): Promise<any> {
    return;
  }
}
