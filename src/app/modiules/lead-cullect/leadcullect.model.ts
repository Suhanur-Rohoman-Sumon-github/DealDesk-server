import { Schema, model, Document } from 'mongoose';
import { RentalApplication } from './leadcullect.interface';

type RentalApplicationDocument = RentalApplication & Document;

const RentalApplicationSchema = new Schema<RentalApplicationDocument>({
  moveInDate: { type: String, required: true },
  applyingAs: { type: String, enum: ['guarantor', 'tenant'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  socialSecurityNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  currentAddress: { type: String, required: true },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  zipPostalCode: { type: String, required: true },
  country: { type: String, required: true },
  employerName: { type: String },
  jobTitle: { type: String },
  monthlyIncome: { type: Number, required: true },
  driversLicenseFront: { type: String, required: true },
  driversLicenseBack: { type: String, required: true },
  selfiePhoto: { type: String, required: true },
  references: { type: String },
  additionalComments: { type: String },
}, {
  timestamps: true,
});

export const RentalApplicationModel = model<RentalApplicationDocument>('RentalApplication', RentalApplicationSchema);
