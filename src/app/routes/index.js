import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { register as statusRegister } from './status.route.js';
import { register as userRegister } from './users.route.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function registerRoutes(router, repository) {
  statusRegister(router);
  userRegister(router, repository)
}
