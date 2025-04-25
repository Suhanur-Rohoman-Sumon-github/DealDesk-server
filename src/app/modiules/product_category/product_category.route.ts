import express from 'express';
import { CategoryController } from './product_category.controller';

const router = express.Router();

router.post(
  '/',
  CategoryController.createCategory
);
router.get(
  '/',
  CategoryController.getAllCategory
);


export const CategoryRoute = router;