import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { userValidation } from '../user/user.validation';
import { AuthControllers } from '../auth/auth.controller';
import { ssnUserController } from './ssnUser.controller';



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

export const ssnUserRoute = router;