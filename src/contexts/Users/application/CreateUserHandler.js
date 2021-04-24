import User from '../domain/User.js';

export default class CreateUserHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async run({ username, email, password }) {
    const [userWithMail] = await this.repository.findUserByEmail(email);
    if (userWithMail) {
      throw new Error(`user with email ${email} already exists`);
    }
    const user = User.create(username, email, password);
    await this.repository.save(user);
  }
}