import { dirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';
import { Router } from 'express';
import { register as statusRegister } from './status.route';
import { register as userRegister } from './users.route';
import { Repository } from '../../Shared/domain/Repository';

export function registerRoutes(router: Router, repository: Repository) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.forEach(route => register(route, router, repository))
}

const register = (routePath: string, app: Router, repository: any) => {
  const route = require(routePath);
  route.register(app, repository);
}
