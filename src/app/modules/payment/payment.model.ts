import { model, Schema } from "mongoose";
import { IPayment, IPAYMENT_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    transactionId: { type: String },
    quantity: { type: Number, required: true },
    amount: { type: Number },
    invoiceUrl: { type: String },
    status: { type: String, enum: IPAYMENT_STATUS },
  },
  { versionKey: false, timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
