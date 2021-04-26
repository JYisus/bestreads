import Crypto from '../../../Shared/domain/Crypto';
import User from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export default class CreateUserHandler {
  constructor(private readonly repository: UserRepository, private readonly crypto: Crypto) {}

  async run({
    username,
    email,
    password,
  }: {
    username: string,
    email: string,
    password: string,
  }) {
    const userWithMail = await this.repository.findUserByEmail(email);
    if (userWithMail) {
      throw new Error(`user with email ${email} already exists`);
    }
    const user = await User.create(username, email, password, this.crypto);
    await this.repository.save(user);
  }
}
