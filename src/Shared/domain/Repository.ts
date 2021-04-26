export interface Repository {
  close(): Promise<void>;
  query(query: { text: string, values: any[] }): Promise<any>;
  query2(query: string): Promise<any>;
  insert(query: { text: string, values: any[] }): Promise<void>;
  createTable(table: string): Promise<void>;
  deleteTable(table: string): Promise<void>;
}
