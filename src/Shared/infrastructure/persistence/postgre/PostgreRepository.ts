import Pool from 'pg-pool';
import { URL } from 'url';
import { Repository } from '../../../domain/Repository';

interface Query {
  text: string,
  values: any[],
}

export default class PostgreRepository implements Repository {
  private db?: Pool<any>;

  private client?: any;

  private readonly options = {
    database: process.env.DATABASE || '',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ...(process.env.DATABASE ? { ssl: true } : {}),
  };

  async connect(database2: string) {
    const databaseConnectionString = process.env.DATABASE_URL;
    if (databaseConnectionString) {
      const {
        username: user,
        password,
        hostname: host,
        port,
        pathname,
      } = new URL(databaseConnectionString);
      this.db = new Pool({
        user,
        password,
        host,
        port: Number(port),
        database: pathname.split('/')[1],
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    } else {
      this.db = new Pool(this.options);
    }
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
