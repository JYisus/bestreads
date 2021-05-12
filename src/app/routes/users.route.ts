import { Request, Response, Router } from 'express';
import UserPutController from '../controllers/UserPutController';
import UserPostController from '../controllers/UserPostController';
import LoginPostController from '../controllers/LoginPostController';
import UserDeleteController from '../controllers/UserDeleteController';
import { Repository } from '../../Shared/domain/Repository';

// eslint-disable-next-line import/prefer-default-export
export const register = (router: Router, repository: Repository) => {
  router.post('/users', (req: Request, res: Response) => new UserPostController(repository).run(req, res));
  router.delete('/users', (req: Request, res: Response) => new UserDeleteController(repository).run(req, res));
  router.put('/users', (req: Request, res: Response) => new UserPutController(repository).run(req, res));
  router.post('/login', (req: Request, res: Response) => new LoginPostController(repository).run(req, res));
};
