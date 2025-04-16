import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

router.post(
  '/',
  ProductController.createProducts
);
router.get(
  '/',
  ProductController.getAllProducts
);
router.get(
  '/:id',
  ProductController.getSingleProducts
);

export const productRouter = router;