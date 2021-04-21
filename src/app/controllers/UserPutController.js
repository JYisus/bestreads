import httpStatus from 'http-status';
import CreateUserHandler from '../../contexts/Users/application/CreateUserHandler.js';
import UserRepositoryBuilder from '../../contexts/Users/infrastructure/persistence/UserRepositoryBuilder.js';
export default class UserPutController {
  #repository;
  constructor(repository) {
    this.#repository = UserRepositoryBuilder.build(repository);
  }

  async run(req, res) {
    try {
      await new CreateUserHandler(this.#repository).run(req.body);
      res.status(httpStatus.OK).send({message: 'user created!'});
    } catch (error) {
      // throw new Error(`UserPutController | Error creating new user: ${error}`)
      res.status(500).send({ message: error.message})
    }
  }
}
