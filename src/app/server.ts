import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import registerRoutes from './routes';
import { Repository } from '../Shared/domain/Repository';
import { Logger } from '../Shared/domain/Logger';

export default class Server {
  private express: Express;

  private httpServer?: http.Server;

  constructor(
    private port: number,
    private repository: Repository,
    private logger: Logger,
  ) {
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    const router = Router();
    this.express.use(router);

    registerRoutes(router, this.repository);

    router.use((
      err: Error,
      req: Request,
      res: Response,
      next: Function,
    ) => {
      this.logger.error(err);
      res.status(500).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(`BestReads Backend App is running at http://localhost:${this.port} int ${this.express.get('env')} mode`);
        this.logger.info('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer(): http.Server | undefined {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
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
