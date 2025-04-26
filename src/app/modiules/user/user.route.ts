import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
router.get(
  '/:userId',
  userControllers.getUserOrderInsights
);
router.post(
  '/verify-email/:token',
  userControllers.verifyEmail
);

export const userRouter = router;