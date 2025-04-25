import express from 'express';
import { ProductController } from './product.controller';
import { multerUpload } from '../../config/multer.config';
const router = express.Router();

router.post(
  '/',
  multerUpload.array('images'),
  ProductController.createProducts,
)
router.get(
  '/',
  ProductController.getALlProducts
);
router.get(
  '/:id',
  ProductController.getSingleProducts
);

router.patch(
  '/add-favorite/:postId/:userId',
  ProductController.addToFavorite,
)
router.get(
  '/my-favorite/:userId',
  ProductController.getFavoriteProducts
);
router.get(
  '/relatedProducts/:categoryName',
  ProductController.getRelatedProducts
);

export const productRouter = router;