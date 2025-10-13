

import express from 'express';
import { SSNController } from './ssn.controller';

const router = express.Router();


router.get('/', 
  SSNController.getAllSSnController
);
router.patch('/buy', 
  SSNController.buySsnController
);
router.get('/:userId', 
  SSNController.getMySsn
);
router.post('/:userId', 
  SSNController.getMySsn
);


export const ssnRouter = router; 