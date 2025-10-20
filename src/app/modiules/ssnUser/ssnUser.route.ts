import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { userValidation } from '../user/user.validation';
import { AuthControllers } from '../auth/auth.controller';
import { ssnUserCartController, ssnUserController } from './ssnUser.controller';



const router = express.Router();
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  ssnUserController.createSnUser,
);
router.get(
  '/:identifier',
  ssnUserController.getUserBalance,
);

router.put("/cart/add", ssnUserCartController.addToCart);
router.patch("/cart/remove", ssnUserCartController.removeFromCart);
router.get("/cart/:userId", ssnUserCartController.getCart);

export const ssnUserRoute = router; 