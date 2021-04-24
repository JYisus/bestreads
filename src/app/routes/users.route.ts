import UserPutController from '../controllers/UserPutController';
import { Request, Response, Router } from 'express';
import { Repository } from '../../Shared/domain/Repository';

export const register = (router: Router, repository: Repository) => {
  router.put('/users', (req: Request, res: Response) => new UserPutController(repository).run(req, res));
}
