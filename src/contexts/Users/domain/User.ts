import Crypto from '../../../Shared/domain/Crypto';

export default class User {
  constructor(
    private username: string,
    private email: string,
    private password: string,
  ) {}

  static async create(
    username: string,
    email: string,
    password: string,
    crypto: Crypto,
  ): Promise<User> {
    const encryptedPassword = await crypto.encrypt(password);
    return new User(username, email, encryptedPassword);
  }

  getData(): { username: string, password: string, email: string } {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
    };
  }

  async checkPassword(plainPassword: string, crypto: Crypto): Promise<boolean> {
    return crypto.compare(plainPassword, this.password);
  }
}
