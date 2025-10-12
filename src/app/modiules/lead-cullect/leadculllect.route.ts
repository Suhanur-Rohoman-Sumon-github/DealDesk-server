import express from 'express';
import { createLead, getLeads } from './leadcullect.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post('/',multerUpload.array('backfrontandselfie'), createLead);
router.get('/', getLeads);

export const leadcullectRouter = router;
