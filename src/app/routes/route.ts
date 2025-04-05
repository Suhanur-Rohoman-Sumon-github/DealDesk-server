import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: 'UserRoute',
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
