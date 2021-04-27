import pino from 'pino';
import { Logger } from '../../domain/Logger';

export default class PinoLogger implements Logger {
  private logger;

  constructor(options: pino.LoggerOptions) {
    this.logger = pino(options);
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
