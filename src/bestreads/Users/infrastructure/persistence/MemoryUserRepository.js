export class MemoryUserRepository{
  #repository;
  static #isTableCreated = false;
  constructor(repository) {
    this.#repository = repository;
  }
  // async build(repository) {
  //   repository.createTable('users');
  //   return new MemoryUserRepository(repository);
  // }

  async save(user) {
    const {
      username,
      email,
      password,
    } = user.getData();
    if(!MemoryUserRepository.#isTableCreated) {
      await this.#repository.createTable('users');
      MemoryUserRepository.#isTableCreated = true;
    }
    // const insertSQL = `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    return this.#repository.insert({
      text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      values: [username, email, password],
    });
  }
  
  async findUserByEmail(email) {
    if (!MemoryUserRepository.#isTableCreated) {
      return [] 
    }
    const queryRes = await this.#repository.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    return queryRes.rows
  }

  async deleteAll() {
    if (MemoryUserRepository.#isTableCreated) {
      await this.#repository.deleteTable('users');
      MemoryUserRepository.#isTableCreated = false;
    }
  }

  moduleName() {
    return 'users';
  }
}
