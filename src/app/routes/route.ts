import { Router } from 'express';
import { authRouter } from '../modiules/auth/auth.routes';
import { productRouter } from '../modiules/products/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
