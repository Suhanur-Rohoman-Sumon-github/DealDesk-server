export type RentalApplication = {
  moveInDate: string; // mm/dd/yyyy, required
  applyingAs: 'guarantor' | 'tenant'; // required

  firstName: string; // required
  lastName: string; // required
  dateOfBirth: string; // mm/dd/yyyy, required
  socialSecurityNumber: string; // required
  phoneNumber: string; // required, format: +1 ***-***-****
  email: string; // required
  currentAddress: string; // required
  city: string; // required
  stateProvince: string; // required
  zipPostalCode: string; // required
  country: string; // required, e.g., 'United States'

  employerName?: string; // optional
  jobTitle?: string; // optional
  monthlyIncome: number; // required

  driversLicenseFront: string; // required, file path or base64
  driversLicenseBack: string; // required, file path or base64
  selfiePhoto: string; // required, file path or base64

  references?: string; // optional
  additionalComments?: string; // optional
};
