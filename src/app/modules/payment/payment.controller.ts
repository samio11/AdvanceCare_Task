import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentServices } from "./payment.service";

const initPayment = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const result = await paymentServices.initPayment(payload);
  sendResponse(res, {
    statusCode: 200,
    message: "Payment Url Given",
    success: true,
    data: result,
  });
});

const successfulPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const failPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.failPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const canceledPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.cancelPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const getAllPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.getAllPayment(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Getting All Payment Data",
    data: result,
  });
});

export const paymentController = {
  initPayment,
  successfulPayment,
  failPayment,
  canceledPayment,
  getAllPayment,
};
