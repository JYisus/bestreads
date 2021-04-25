import PinoLogger from './PinoLogger';
import { Logger } from '../../domain/Logger';

export default class LoggerBuilder {
  static build(): Logger {
    const env = process.env.NODE_ENV || 'test';

    switch (env) {
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
      default:
    }
    return new PinoLogger({
      level: 'info',
      prettyPrint: true,
    });
  }
}
