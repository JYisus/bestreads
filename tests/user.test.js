import request from 'supertest';
import BestReadsBackendApp from '../src/app/BestReadsBackendApp.js';
import User from '../src/contexts/Users/domain/User.js';
import UserRepositoryBuilder from '../src/contexts/Users/infrastructure/persistence/UserRepositoryBuilder.js';
import RepositoryBuilder from '../src/Shared/persistence/RepositoryBuilder.js';
import LoggerBuilder from '../src/Shared/logger/LoggerBuilder.js';
// import MemoryUserRepository from '../src/infrastructure/repositories/memory.js';
const logger = LoggerBuilder.build();
describe('Users management', () => {
  let app;
  let repository;
  let userRepository;

  beforeEach(async () => {
    repository = await RepositoryBuilder.build('memory', '');
    userRepository = UserRepositoryBuilder.build(repository);
    app = new BestReadsBackendApp(0, repository, logger);
    await app.start();
  })

  afterEach(async () => {
    // await repository.close();
    await userRepository.deleteAll();
    await app.stop();
  });

  describe('User creation', () => {
    it('should return status 200 and a healthy message if a user is created', async () => {
      const response = await request(app.httpServer())
        .put('/users')
        .send({ username: 'user001', password: 'password', email: 'test@bestreads.com' })
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ message: 'user created!' }));
    });

    it('should return status 500 if email already exists', async () => {
      const username = 'user001';
      const password = 'password';
      const email = 'test@bestreads.com';
      const user = new User(username, email, password)
      await userRepository.save(user);
      const response = await request(app.httpServer())
        .put('/users')
        .send({ username, password, email })
        .expect(500);
      
      expect(response.body).toEqual(expect.objectContaining({ message: 'user with email test@bestreads.com already exists'}))
    });
  });
});
