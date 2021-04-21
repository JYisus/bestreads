import request from 'supertest';
import BestReadsBackendApp from '../src/app/BestReadsBackendApp.js';
import RepositoryBuilder from '../src/Shared/persistence/RepositoryBuilder.js';
import LoggerBuilder from '../src/Shared/logger/LoggerBuilder.js';
// import MemoryUserRepository from '../src/infrastructure/repositories/memory.js';
const logger = LoggerBuilder.build();
describe('Server status', () => {
  let app;
  let repository;

  beforeEach(async () => {
    repository = await RepositoryBuilder.build('memory', '');
    app = new BestReadsBackendApp(0, repository, logger);
    await app.start();

  })

  afterEach(async () => {
    await app.stop();
  });

  it('should return status 200 and a healthy message', async () => {
    const response = await request(app.httpServer())
      .get('/status')
      .send()
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining({status: 'healthy'}))
  });
});

