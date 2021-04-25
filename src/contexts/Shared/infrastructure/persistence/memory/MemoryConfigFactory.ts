import config from '../../config';

// eslint-disable-next-line import/prefer-default-export
export class MemoryConfigFactory {
  static createConfig() {
    return {
      url: config.get('postgre.url'),
    };
  }
}
