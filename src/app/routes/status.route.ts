import { Express } from 'express';
import StatusController from '../controllers/StatusGetController';
import { Repository } from '../../Shared/domain/Repository';

// eslint-disable-next-line import/prefer-default-export
export const register = (app: Express, repository: Repository) => {
  app.get('/status', (req, res) => new StatusController().run(req, res));
};
