import request from 'supertest';
import BestReadsBackendApp from '../apps/bestreads/BestReadsBackendApp.js';
import RepositoryBuilder from '../src/Shared/infrastructure/persistence/RepositoryBuilder.js';
// import MemoryUserRepository from '../src/infrastructure/repositories/memory.js';

describe('Server status', () => {
  let app;
  let repository;

  beforeEach(async () => {
    repository = await RepositoryBuilder.build('memory', '');
    app = new BestReadsBackendApp(0, repository);
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

