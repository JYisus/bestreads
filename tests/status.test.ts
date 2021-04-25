import request from 'supertest';
import BestReadsBackendApp from '../src/app/BestReadsBackendApp';
import RepositoryBuilder from '../src/Shared/infrastructure/persistence/RepositoryBuilder';
import LoggerBuilder from '../src/Shared/infrastructure/logger/LoggerBuilder';
import { Repository } from '../src/Shared/domain/Repository';

const logger = LoggerBuilder.build();
describe('Server status', () => {
  let app: BestReadsBackendApp;
  let repository: Repository;

  beforeEach(async () => {
    repository = await RepositoryBuilder.build('postgre', '');
    app = new BestReadsBackendApp(0, repository, logger);
    await app.start();

  })

  afterEach(async () => {
    await app.stop();
  });

  it('should return status 200 and a healthy message', async () => {
    const response = await request(app.httpServer)
      .get('/status')
      .send()
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining({status: 'healthy'}))
  });
});

