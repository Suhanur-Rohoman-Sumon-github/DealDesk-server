import express from 'express';
import { OrdersControllers } from './order_dtails.controller';
const router = express.Router();

router.post(
  '/',
  OrdersControllers.createOrder
);
router.get(
  '/',
  OrdersControllers.getAllOrders
);
router.get(
  '/:userId',
  OrdersControllers.getSingleOrders
);
router.patch(
  '/:orderId',
  OrdersControllers.updateOrder
);

export const orderRouter = router;