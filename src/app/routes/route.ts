import { Router } from 'express';
import { authRouter } from '../modiules/auth/auth.routes';
import { productRouter } from '../modiules/products/product.route';
import { orderRouter } from '../modiules/order_dtails/order_dtails.route';
import { CategoryRoute } from '../modiules/product_category/product_category.route';
import { userRouter } from '../modiules/user/user.route';
import { AdminRouter } from '../modiules/admin/admin.routes';
import { leadcullectRouter } from '../modiules/lead-cullect/leadculllect.route';
import { ssnRouter } from '../modiules/ssns/ssn.route';
import { ssnUserRoute } from '../modiules/ssnUser/ssnUser.route';

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
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
  {
    path: '/lead-cullect',
    route: leadcullectRouter,
  },
  {
    path: '/ssns',
    route: ssnRouter,
  },
  {
    path: '/ssn-user',
    route: ssnUserRoute,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
