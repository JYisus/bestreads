import { Express } from 'express';
import StatusController from '../controllers/StatusGetController';
import { Repository } from '../../Shared/domain/Repository';

export const register = (app: Express, repository: Repository) => {
  app.get('/status', (req, res) => new StatusController().run(req, res));
};
