import { Server  } from './server.js';
import { controllers } from './controllers/index.js';

export default class BestReadsBackendApp {
  #server;
  #repository;
  #port;
  logger;

  constructor(port, repository, logger) {
    this.#port = port;
    this.#repository = repository;
    this.logger = logger;
  }

  async start() {
    const port = this.#port;
    this.#server = new Server(port, controllers, this.#repository, this.logger);
    return this.#server.listen();
  }

  async stop() {
    await this.#repository.close();
    await this.#server?.stop();
  }

  httpServer() {
    return this.#server ? this.#server.getHTTPServer() : undefined;
  }
}
