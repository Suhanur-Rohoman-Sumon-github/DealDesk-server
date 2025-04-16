import { Router } from 'express';
import { authRouter } from '../modiules/auth/auth.routes';
import { productRouter } from '../modiules/products/product.route';
import { orderRouter } from '../modiules/order_dtails/order_dtails.route';

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
  {
    path: '/orders',
    route: orderRouter,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
