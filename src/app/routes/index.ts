import glob from 'glob';
import { Router } from 'express';
import { Repository } from '../../Shared/domain/Repository';

const register = (routePath: string, app: Router, repository: any) => {
  const route = require(routePath);
  route.register(app, repository);
};

export default function registerRoutes(router: Router, repository: Repository) {
  const routes = glob.sync(`${__dirname}/**/*.route.*`);
  routes.forEach((route) => register(route, router, repository));
}
