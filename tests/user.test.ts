import request from 'supertest';
import BestReadsBackendApp from '../src/app/BestReadsBackendApp';
import User from '../src/contexts/Users/domain/User';
import UserRepositoryBuilder from '../src/contexts/Users/infrastructure/persistence/UserRepositoryBuilder';
import RepositoryBuilder from '../src/Shared/infrastructure/persistence/RepositoryBuilder';
import LoggerBuilder from '../src/Shared/infrastructure/logger/LoggerBuilder';
import { Repository } from '../src/Shared/domain/Repository';
import { UserRepository } from '../src/contexts/Users/domain/UserRepository';

const logger = LoggerBuilder.build();
describe('Users management', () => {
  let app: BestReadsBackendApp;
  let repository: Repository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    repository = await RepositoryBuilder.build('postgre', '');
    await repository.createTable('users');
    userRepository = UserRepositoryBuilder.build(repository);
    app = new BestReadsBackendApp(0, repository, logger);
    await app.start();
  });

  afterEach(async () => {
    await userRepository.deleteAll();
    await app.stop();
  });

  describe('User creation', () => {
    it('should return status 200 and a healthy message if a user is created', async () => {
      const response = await request(app.httpServer)
        .put('/users')
        .send({ username: 'user001', password: 'password', email: 'test@bestreads.com' })
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ message: 'user created!' }));
    });

    it('should return status 500 if email already exists', async () => {
      const username = 'user001';
      const password = 'password';
      const email = 'test@bestreads.com';
      const user = new User(username, email, password);
      await userRepository.save(user);
      const response = await request(app.httpServer)
        .put('/users')
        .send({ username, password, email })
        .expect(500);

      expect(response.body).toEqual(expect.objectContaining({ message: 'user with email test@bestreads.com already exists' }));
    });

    it('should register user with encrypted password', async () => {
      const user = { username: 'user001', password: 'password', email: 'test@bestreads.com' };
      const response = await request(app.httpServer)
        .put('/users')
        .send(user)
        .expect(200);

      const [userRegistered] = await repository.query({ text: 'SELECT password FROM users WHERE email = $1', values: [user.email] });
      expect(response.body).toEqual(expect.objectContaining({ message: 'user created!' }));
      expect(userRegistered.password === user.password).toBeFalsy();
    });
  });
  describe('user login', () => {
    it('should successfully login if correct password is introduced', async () => {
      const userData = { username: 'user001', password: 'password', email: 'test@bestreads.com' };
      const credentials = { email: 'test@bestreads.com', password: 'password' };

      await request(app.httpServer)
        .put('/users')
        .send(userData)
        .expect(200);

      const response = await request(app.httpServer)
        .post('/users')
        .send(credentials)
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ message: 'Successfully loged in!' }));
    });
  });
});
