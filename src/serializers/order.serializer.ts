import * as yup from "yup";

import { Schema } from "yup";

import { IOrderRequest } from "../interfaces";

export const createOrderSchema: Schema<IOrderRequest> = yup.object().shape({
  days: yup.number().required(),
  userId: yup.string().required(),
  bookId: yup.string().required(),
});
