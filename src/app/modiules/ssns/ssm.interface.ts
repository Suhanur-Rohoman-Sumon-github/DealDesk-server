export type TSSN = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  ssnNumber: string;
  gender: "M" | "F" | "Other";
  alternatePhoneNumber?: string;
  accountNumber: string;
  bank: string;
  routingNumber: string;
  email: string;
}
