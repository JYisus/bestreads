import Pool from 'pg-pool';
import { Repository } from '../../../domain/Repository';

const ENDPOINT = 'postgres://test-user:0b47c69b1033498d5f33f5f7d97bb6a3126134751629f4d0185c115db44c094e@localhost/test-db';

interface Query {
  text: string,
  values: any[],
}
// import config from '../../../../contexts/Shared/infrastructure/config/index.js';
export default class PostgreRepository implements Repository {
  private db?: Pool<any>;

  private client?: any;

  private readonly options = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  async connect(database: string) {
    this.db = new Pool(this.options);
  }

  async insert(query: string): Promise<void> {
    await this.db?.query(query);
  }

  async query(query: string): Promise<any[] | undefined> {
    const res = await this.db?.query(query);
    return res?.rows;
  }

  async deleteTable(table: string): Promise<void> {
    await this.db?.query(`
      TRUNCATE ${table}
    `);
  }

  async createTable(table: string): Promise<void> {
    await this.db?.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `);
  }

  moduleName() {}

  get getClient() {
    return this.client;
  }

  async persist(insertSQL: string) {
    return this.client.none(insertSQL);
  }

  async close() {
    return this.client ? this.client.end() : undefined;
  }
}
