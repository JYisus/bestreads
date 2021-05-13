import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ModifyUserHandler from '../../contexts/Users/application/ModifyUserHandler';
import UserRepositoryBuilder from '../../contexts/Users/infrastructure/persistence/UserRepositoryBuilder';
import { UserRepository } from '../../contexts/Users/domain/UserRepository';
import { Repository } from '../../Shared/domain/Repository';
import BcryptCrypto from '../../Shared/infrastructure/crypto/BcryptCrypto';

export default class UserPutController {
  private repository: UserRepository;

  constructor(repository: Repository) {
    this.repository = UserRepositoryBuilder.build(repository);
  }

  async run(req: Request, res: Response) {
    try {
      await new ModifyUserHandler(this.repository, new BcryptCrypto()).run(req.body.email, req.body);
      res.status(httpStatus.OK).send({ message: 'User successfully modified!' });
    } catch (error) {
      // throw new Error(`UserPutController | Error creating new user: ${error}`)
      res.status(500).send({ message: error.message });
    }
  }
}
