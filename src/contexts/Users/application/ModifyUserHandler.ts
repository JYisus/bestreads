import Crypto from '../../../Shared/domain/Crypto';
import { UserRepository } from '../domain/UserRepository';

export default class DeleteUserHandler {
  constructor(private readonly repository: UserRepository, private readonly crypto: Crypto) {}

  async run(email: string, newData: { username: string, email: string, password: string }) {
    const user = await this.repository.findUserByEmail(email);

    if (user) {
      await this.repository.modifyUserWithEmail(email, newData);
    } else {
      throw new Error(`User with email ${email} doesn't exist!`);
    }
  }
}
