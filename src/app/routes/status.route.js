import StatusController from '../controllers/StatusGetController.js';

export const register = (router, repository) => {
  router.get('/status', (req, res) => new StatusController(repository).run(req, res));
};
