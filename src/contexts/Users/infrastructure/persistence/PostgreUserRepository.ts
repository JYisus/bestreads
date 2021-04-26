import { Repository } from '../../../../Shared/domain/Repository';
import User from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export default class PostgreUserRepository implements UserRepository {
  constructor(private readonly repository: Repository) {}

  async save(user: User) {
    const {
      username,
      email,
      password,
    } = user.getData();

    // const insertSQL = `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    return this.repository.insert({
      text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      values: [username, email, password],
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const queryRes = await this.repository.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    if (queryRes.length === 0) {
      return undefined;
    }

    return queryRes[0];
  }

  async deleteAll() {
    await this.repository.deleteTable('users');
  }
}
