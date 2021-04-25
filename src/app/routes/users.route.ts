import { Request, Response, Router } from 'express';
import UserPutController from '../controllers/UserPutController';
import { Repository } from '../../Shared/domain/Repository';

// eslint-disable-next-line import/prefer-default-export
export const register = (router: Router, repository: Repository) => {
  router.put('/users', (req: Request, res: Response) => new UserPutController(repository).run(req, res));
};
