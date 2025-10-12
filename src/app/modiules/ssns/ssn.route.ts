

import express from 'express';
import { SSNController } from './ssn.controller';

const router = express.Router();


router.get('/', 
  SSNController.getAllSSnController
);


export const ssnRouter = router; 