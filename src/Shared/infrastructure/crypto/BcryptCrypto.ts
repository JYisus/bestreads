import { hash, compare as compareBcrypt } from 'bcrypt';
import { createHash } from 'crypto';
import Crypto from '../../domain/Crypto';

export default class BcryptCrypto implements Crypto {
  static saltRounds = 10;

  async encrypt(message: string): Promise<string> {
    return createHash('sha1').update(message).digest('hex').toString();
  }

  async compare(message: string, hashedMessage: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(
      createHash('sha1').update(message).digest('hex') === hashedMessage,
    ));
    // return compareBcrypt(message, hashedMessage);
  }
}
