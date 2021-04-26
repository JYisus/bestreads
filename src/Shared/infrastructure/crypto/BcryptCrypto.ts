import { hash, compare } from 'bcrypt';
import Crypto from '../../domain/Crypto';

export default class BcryptCrypto implements Crypto {
  static saltRounds = 10;

  async encrypt(message: string): Promise<string> {
    return hash(message, BcryptCrypto.saltRounds);
  }

  async compare(encryptedMessage: string, hashMessage: string): Promise<boolean> {
    return compare(encryptedMessage, hashMessage);
  }
}
