import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CreateUserHandler from '../../contexts/Users/application/CreateUserHandler';
import UserRepositoryBuilder from '../../contexts/Users/infrastructure/persistence/UserRepositoryBuilder';
import { UserRepository } from '../../contexts/Users/domain/UserRepository';
import { Repository } from '../../Shared/domain/Repository';

export default class UserPutController {
  private repository: UserRepository;
  constructor(repository: Repository) {
    this.repository = UserRepositoryBuilder.build(repository);
  }

  async run(req: Request, res: Response) {
    try {
      await new CreateUserHandler(this.repository).run(req.body);
      res.status(httpStatus.OK).send({ message: 'user created!' });
    } catch (error) {
      // throw new Error(`UserPutController | Error creating new user: ${error}`)
      res.status(500).send({ message: error.message });
    }
  }
}