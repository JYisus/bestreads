export default interface Crypto {
  encrypt(message: string): Promise<string>;
  compare(encryptedMessage: string, hashMessage: string): Promise<boolean>;
}
