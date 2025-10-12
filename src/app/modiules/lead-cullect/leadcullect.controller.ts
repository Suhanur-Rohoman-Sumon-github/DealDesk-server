import { Request, Response } from 'express';
import { RentalApplicationModel } from './leadcullect.model';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';

// Create a new lead (rental application)
export const createLead = catchAsync(async (req: Request, res: Response) => {
  const leadData = req.body;
  const newLead = await RentalApplicationModel.create(leadData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Lead created successfully',
    data: newLead,
  });
});

// Get all leads (rental applications)
export const getLeads = catchAsync(async (req: Request, res: Response) => {
  const leads = await RentalApplicationModel.find();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Leads retrieved successfully',
    data: leads,
  });
});
