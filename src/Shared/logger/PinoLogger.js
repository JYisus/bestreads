import pino from 'pino';

export default class PinoLogger {
  #logger;
  constructor(options) {
    this.#logger = pino(options);
  }

  info(message) {
    this.#logger.info(message);
  }

  error(message) {
    this.#logger.error(message);
  }

  debug(message) {
    this.#logger.debug(message);
  }
}