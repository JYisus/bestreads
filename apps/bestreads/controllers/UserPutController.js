import httpStatus from 'http-status';
import CreateUserHandler from '../../../src/bestreads/Users/application/CreateUserHandler.js';
import UserCreator from '../../../src/bestreads/Users/application/UserCreator.js';
import UserRepositoryBuilder from '../../../src/bestreads/Users/infrastructure/persistence/UserRepositoryBuilder.js';
export default class UserPutController {
  #repository;
  constructor(repository) {
    this.#repository = UserRepositoryBuilder.build(repository);
  }

  async run(req, res) {
    try {
      const userCreator = new UserCreator(this.#repository)
      await new CreateUserHandler(userCreator).run(req.body);
      res.status(httpStatus.OK).send({message: 'user created!'});
    } catch (error) {
      // throw new Error(`UserPutController | Error creating new user: ${error}`)
      res.status(500).send({ message: error.message})
    }
  }
}
