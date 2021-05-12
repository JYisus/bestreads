import User from './User';

export interface UserRepository {
  save(user: User): Promise<void>;
  // search(email: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  deleteUserWithEmail(email: string): Promise<void>;
  deleteAll(): Promise<void>;
}
