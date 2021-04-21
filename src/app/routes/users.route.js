import UserPutController from '../controllers/UserPutController.js';

export const register = (router, repository) => {
  router.put('/users', (req, res) => new UserPutController(repository).run(req, res));
}
