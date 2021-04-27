import PostgreUserRepository from './PostgreUserRepository';
import { Repository } from '../../../../Shared/domain/Repository';
import { UserRepository } from '../../domain/UserRepository';

export default class UserRepositoryBuilder {
  static build(repository: Repository): UserRepository {
    const environment = process.env.NODE_ENV || 'test';
    switch (environment) {
      case 'dev':
        return new PostgreUserRepository(repository);
      case 'test':
        return new PostgreUserRepository(repository);
      case 'docker':
        return new PostgreUserRepository(repository);
      default:
        throw Error('UserRepositoryBuilder | Error getting environment');
    }
  }
}
