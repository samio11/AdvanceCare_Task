import { AppError } from "../../errors/AppError";
import { generateTransectionId } from "../../utils/generateTransectionId";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.services";

import { User } from "../user/user.model";
import { IPayment, IPAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const initPayment = async (payload: IPayment) => {
  const existsProduct = await Product.findById(payload.product);
  if (!existsProduct) throw new AppError(401, "Product is not found");
  if (existsProduct.stock === 0)
    throw new AppError(401, "Product is out of stock");
  const existUser = await User.findById(payload.user);
  if (!existUser) throw new AppError(401, "User is not found");
  const tans_id = generateTransectionId();
  const calculatedPrice =
    Number(payload.quantity) * Number(existsProduct.price);
  const session = await Payment.startSession();
  session.startTransaction();
  const paymentPayload: IPayment = {
    product: payload.product,
    user: payload.user,
    transactionId: tans_id,
    quantity: payload.quantity,
    amount: calculatedPrice,
    status: IPAYMENT_STATUS.UNPAID,
  };
  try {
    const createPayment = await Payment.create([paymentPayload], { session });
    await Product.findByIdAndUpdate(
      payload.product,
      { $inc: { stock: -createPayment[0].quantity } },
      { new: true, session }
    );

    const sslCommerzPayload: ISSLCommerz = {
      amount: createPayment[0]?.amount as number,
      transactionId: tans_id,
      name: existUser.name,
      email: existUser.email,
      phoneNumber: existUser.phoneNumber,
    };

    const sslCommerz = await SSLService.sslPaymentInit(sslCommerzPayload);
    // console.log(sslCommerz);

    await session.commitTransaction();
    session.endSession();
    return {
      payment_url: sslCommerz.GatewayPageURL,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const successPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transactionId: query?.transactionId }, // Changed from transection_id
      { status: IPAYMENT_STATUS.PAID },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Created Done",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const failPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transactionId: query?.transactionId }, // Changed from transection_id
      { status: IPAYMENT_STATUS.FAILED },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Failed",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transactionId: query?.transactionId }, // Changed from transection_id
      { status: IPAYMENT_STATUS.CANCELLED },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Canceled",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getAllPayment = async (query: Record<string, string>) => {
  const productQuery = new QueryBuilder(Payment.find(), query);
  const productData = productQuery.filter().sort().paginate().fields();
  const [data, meta] = await Promise.all([
    await productData.build(),
    await productData.getMeta(),
  ]);
  return { data, meta };
};

export const paymentServices = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  getAllPayment,
};
