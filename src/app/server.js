import bodyParser from 'body-parser';
import express from 'express';
import Router from 'express-promise-router';
import { registerRoutes } from './routes/index.js';
// import container from './dependency-injection/index.js';

export class Server {
  #express;
  #port;
  #httpServer;
  logger;

  constructor(port, controllers, repository, logger) {
    this.#port = port;
    this.logger = logger;
    this.#express = express();
    this.#express.use(bodyParser.json());
    this.#express.use(bodyParser.urlencoded({ extended: true }));
    const router = Router();
    this.#express.use(router);

    registerRoutes(router, repository);

    router.use((err, _req, res, _next) => {
      this.logger.error(err);
      res.status(500).send(err.message);
    });
  }

  async listen() {
    return new Promise((resolve) => {
      this.#httpServer = this.#express.listen(this.#port, () => {
        this.logger.info(`BestReads Backend App is running at http://localhost:${this.#port} int ${this.#express.get('env')} mode`)
        this.logger.info('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.#httpServer;
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (this.#httpServer) {
        this.#httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
