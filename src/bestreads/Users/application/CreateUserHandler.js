export default class CreateUserHandler {
  #userCreator;
  constructor(userCreator) {
    this.#userCreator = userCreator;
  }

  async run(command) {
    await this.#userCreator.run(command);
  }
}