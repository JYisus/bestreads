import PinoLogger from './PinoLogger.js';

export default class LoggerBuilder {
  static build() {
    const env = process.env.NODE_ENV || 'test';

    switch(env) {
      case 'test':
        return new PinoLogger({
          level: 'error',
          prettyPrint: true,
        });
      case 'dev':
        return new PinoLogger({
          level: 'info',
          prettyPrint: true,
        });
    }
  }
}
