import Server from './server';
import * as http from 'http';
import { Logger } from '../Shared/domain/Logger';
import { Repository } from '../Shared/domain/Repository';

export default class BestReadsBackendApp {
  private server: any;

  constructor(
    private port: number,
    private repository: Repository,
    private logger: Logger,
  ) {}

  async start(): Promise<http.Server> {
    this.server = new Server(this.port, this.repository, this.logger);
    return this.server.listen();
  }

  async stop(): Promise<void> {
    await this.repository?.close();
    await this.server?.stop();
  }

  get httpServer(): http.Server | undefined {
    return this.server?.getHTTPServer();
  }
}
