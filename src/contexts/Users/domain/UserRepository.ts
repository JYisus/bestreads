import User from './User';
import { UserData } from './UserData';

export interface UserRepository {
  save(user: User): Promise<void>;
  // search(email: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  deleteUserWithEmail(email: string): Promise<void>;
  modifyUserWithEmail(email: string, newData: UserData): Promise<void>;
  deleteAll(): Promise<void>;
}
