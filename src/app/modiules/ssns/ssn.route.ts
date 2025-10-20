

import express from 'express';
import { SSNController } from './ssn.controller';
import Auth from '../../middleware/auth';


const router = express.Router();


router.get('/',
  Auth(), 
  SSNController.getAllSSnController
);
router.patch('/buy', 
    Auth(), 
  SSNController.buySsnController
);
router.get('/:userId', 
   Auth(), 
  SSNController.getMySsn
);
router.post('/:userId', 
   Auth(), 
  SSNController.getMySsn
);


export const ssnRouter = router; 