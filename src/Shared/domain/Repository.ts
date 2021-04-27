export interface Repository {
  close(): Promise<void>;
  query(query: string): Promise<any>;
  insert(query: string): Promise<void>;
  createTable(table: string): Promise<void>;
  deleteTable(table: string): Promise<void>;
}
