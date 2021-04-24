export default class User {
  constructor(
    private username: string,
    private email: string,
    private password: string,
   ) {}

  static create(username: string, email: string, password: string) {
    return new User(username, email, password);
  }

  getData() : { username: string, password: string, email: string } {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
    }
  }
}
