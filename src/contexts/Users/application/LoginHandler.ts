import Crypto from '../../../Shared/domain/Crypto';
import { UserRepository } from '../domain/UserRepository';

export default class LoginHandler {
  constructor(private readonly repository: UserRepository, private readonly crypto: Crypto) {}

  async run({
    email,
    password,
  }: {
    email: string,
    password: string,
  }) {
    const user = await this.repository.findUserByEmail(email);
    if (user) {
      const isValidPassword = await user.checkPassword(password, this.crypto);
      if (isValidPassword) {
        return { message: 'SUCCESS' };
      }
    }
    throw new Error('Invalid credentials');
  }
}
