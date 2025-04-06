import { Router } from 'express';
import { authRouter } from '../modiules/auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
