import { PostgreRepository } from './postgre/PostgreRepository';
import { Repository } from '../../domain/Repository';

export default class RepositoryBuilder {
  static async build(type: string, database: string): Promise<Repository> {
    if(type === 'postgre') {
      const postgreRepository = new PostgreRepository();
      await postgreRepository?.connect(database);
      return postgreRepository;
    }

    throw new Error('Error creating database connection');
  }
}