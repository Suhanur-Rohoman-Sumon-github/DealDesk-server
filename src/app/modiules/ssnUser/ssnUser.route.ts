import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { userValidation } from '../user/user.validation';
import { AuthControllers } from '../auth/auth.controller';
import { ssnUserCartController, ssnUserController } from './ssnUser.controller';
import Auth from '../../middleware/auth';



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

router.put("/cart/add", Auth(), ssnUserCartController.addToCart);
router.patch("/cart/remove", Auth(), ssnUserCartController.removeFromCart);
router.get("/cart/:userId", Auth(), ssnUserCartController.getCart);

export const ssnUserRoute = router; 