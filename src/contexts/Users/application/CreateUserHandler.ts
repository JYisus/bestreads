import User from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export default class CreateUserHandler {
  constructor(private readonly repository: UserRepository) {}

  async run({
    username,
    email,
    password,
  }: {
    username: string,
    email: string,
    password: string,
  }) {
    const [userWithMail] = await this.repository.findUserByEmail(email);
    if (userWithMail) {
      throw new Error(`user with email ${email} already exists`);
    }
    const user = User.create(username, email, password);
    await this.repository.save(user);
  }
}
