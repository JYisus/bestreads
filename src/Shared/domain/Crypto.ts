export default interface Crypto {
  encrypt(message: string): Promise<string>;
  compare(message: string, hashedMessage: string): Promise<boolean>;
}
