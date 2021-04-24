import { Repository } from '../../../../Shared/domain/Repository';
import User from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export default class PostgreUserRepository implements UserRepository{
  private static isTableCreated = false;

  constructor(private readonly repository: Repository) {}

  async save(user: User) {
    const {
      username,
      email,
      password,
    } = user.getData();
    if(!PostgreUserRepository.isTableCreated) {
      await this.repository.createTable('users');
      PostgreUserRepository.isTableCreated = true;
    }
    // const insertSQL = `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    return this.repository.insert({
      text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      values: [username, email, password],
    });
  }
  
  async findUserByEmail(email: string) {
    if (!PostgreUserRepository.isTableCreated) {
      return [] 
    }
    const queryRes = await this.repository.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    console.log(queryRes.rows)

    return queryRes.rows
  }

  async deleteAll() {
    if (PostgreUserRepository.isTableCreated) {
      await this.repository.deleteTable('users');
      PostgreUserRepository.isTableCreated = false;
    }
  }

  moduleName() {
    return 'users';
  }
}
