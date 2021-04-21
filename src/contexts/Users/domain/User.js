export default class User {
  #username;
  #email;
  #password;
  constructor(username, email, password) {
    this.#username = username;
    this.#email = email;
    this.#password = password;
  }

  static create(username, email, password) {
    return new User(username, email, password);
  }

  getData() {
    return {
      username: this.#username,
      password: this.#password,
      email: this.#email,
    }
  }
}
