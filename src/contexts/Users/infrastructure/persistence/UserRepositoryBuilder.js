import PostgreUserRepository from './PostgreUserRepository.js';

export default class UserRepositoryBuilder {
  static build(repository) {
    const environment = process.env.NODE_ENV || 'test';
    switch (environment) {
      case 'dev':
        return new PostgreUserRepository(repository);
      case 'test':
        return new PostgreUserRepository(repository);
      default:
        throw Error('UserRepositoryBuilder | Error getting environment');
    }
  }
}