import format from 'pg-format';
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

    // const insertSQL = format('INSERT INTO users (username, email, password) VALUES (%L, %L, %L)', username, email, password);
    const insertSQL = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    return this.repository.insert(insertSQL);
  }

  async findUserByEmail(requestedEmail: string): Promise<User | undefined> {
    const sqlQuery = format('SELECT * FROM users WHERE email = %L', requestedEmail);
    const queryRes = await this.repository.query(sqlQuery);
    if (queryRes.length === 0) {
      return undefined;
    }

    const {
      username,
      password,
      email,
    } = queryRes[0];

    return new User(username, email, password);
  }

  async deleteUserWithEmail(email: string): Promise<void> {
    const sqlQuery = format('DELETE FROM users WHERE email = %L', email);
    await this.repository.query(sqlQuery);
  }

  async deleteAll() {
    await this.repository.deleteTable('users');
  }
}
