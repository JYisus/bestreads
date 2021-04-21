import { MemoryRepository } from "./memory/MemoryRepository.js";

export default class RepositoryBuilder {
  static async build(type, database) {
    if(type === 'memory') {
      const memoryRepository = new MemoryRepository();
      await memoryRepository?.connect(database);
      return memoryRepository;
    }

    throw new Error('Error creating database connection');
  }
}