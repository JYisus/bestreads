import { Request, Response } from 'express';
import httpStatus from 'http-status';
import DeleteUserHandler from '../../contexts/Users/application/DeleteUserHandler';
import UserRepositoryBuilder from '../../contexts/Users/infrastructure/persistence/UserRepositoryBuilder';
import { UserRepository } from '../../contexts/Users/domain/UserRepository';
import { Repository } from '../../Shared/domain/Repository';
import BcryptCrypto from '../../Shared/infrastructure/crypto/BcryptCrypto';

export default class UserDeleteController {
  private repository: UserRepository;

  constructor(repository: Repository) {
    this.repository = UserRepositoryBuilder.build(repository);
  }

  async run(req: Request, res: Response) {
    try {
      await new DeleteUserHandler(this.repository, new BcryptCrypto()).run(req.body.email);
      res.status(httpStatus.OK).send({ message: 'User deleted successfully!' });
    } catch (error) {
      // throw new Error(`UserPutController | Error creating new user: ${error}`)
      res.status(500).send({ message: error.message });
    }
  }
}
