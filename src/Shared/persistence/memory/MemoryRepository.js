import Pool from 'pg-pool';
import config from '../../../contexts/Shared/infrastructure/config/index.js';
export class MemoryRepository {
  #db;
  #client;
  #hostDB = process.env.DB || 'postgres://test-user@localhost/test-db';
  
  async connect(database) {
    this.#db = new Pool({ connectionString: this.#hostDB });
  }

  async insert(query) {
    await this.#db.query(query.text, query.values);
  }

  async query(query) {
    return this.#db.query(query.text, query.values);
  }
  async deleteTable(table) {
    await this.#db.query(`
      TRUNCATE ${table}
    `)
  }

  async createTable(table) {
    await this.#db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `)
  }


  moduleName() {}

  client() {
    return this.#client;
  }

  async persist(insertSQL) {
    return await this.#client.none(insertSQL);
  }

  async close() {
    return this.#client ? this.client.end() : undefined;
  }
}
