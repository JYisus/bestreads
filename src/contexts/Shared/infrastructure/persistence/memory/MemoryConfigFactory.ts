import config from '../../config';

export class MemoryConfigFactory {
  static createConfig() {
    return {
      url: config.get('postgre.url'),
    }
  }
}