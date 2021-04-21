import config from '../../../Shared/infrastructure/config/index.js';
import { MemoryUserRepository } from './MemoryUserRepository.js';

export default class UserRepositoryBuilder {
  static build(repository) {
    const environment = process.env.NODE_ENV || 'test';
    switch (environment) {
      case 'dev':
        return new MemoryUserRepository(repository);
      case 'test':
        return new MemoryUserRepository(repository);
      default:
        throw Error(`UserRepositoryBuilder | Error getting environment`);
    }
  }
}