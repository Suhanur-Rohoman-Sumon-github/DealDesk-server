import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
router.get(
  '/:userId',
  userControllers.getUserOrderInsights
);
router.post(
  '/verify-email',
  userControllers.verifyEmail
);
router.get(
  '/verification-code/:userEmail',
  userControllers.getUserVerificationCode
);

export const userRouter = router;