import { Types } from "mongoose";

export enum IPAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export interface IPayment {
  product: Types.ObjectId;
  user: Types.ObjectId;
  transactionId?: string;
  quantity: number;
  amount?: number;
  invoiceUrl?: string;
  status: IPAYMENT_STATUS;
}
