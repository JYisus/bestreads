import { PosrgreUserRepository } from './PostgreUserRepository.js';

export default class UserRepositoryBuilder {
  static build(repository) {
    const environment = process.env.NODE_ENV || 'test';
    switch (environment) {
      case 'dev':
        return new PosrgreUserRepository(repository);
      case 'test':
        return new PosrgreUserRepository(repository);
      default:
        throw Error(`UserRepositoryBuilder | Error getting environment`);
    }
  }
}