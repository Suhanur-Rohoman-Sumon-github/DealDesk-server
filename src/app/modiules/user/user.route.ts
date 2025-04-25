import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();
router.get(
  '/:userId',
  userControllers.getUserOrderInsights
);

export const userRouter = router;