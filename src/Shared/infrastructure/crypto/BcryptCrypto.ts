import { hash, compare as compareBcrypt } from 'bcrypt';
import Crypto from '../../domain/Crypto';

export default class BcryptCrypto implements Crypto {
  static saltRounds = 10;

  async encrypt(message: string): Promise<string> {
    return hash(message, BcryptCrypto.saltRounds);
  }

  async compare(message: string, hashedMessage: string): Promise<boolean> {
    return compareBcrypt(message, hashedMessage);
  }
}
