import * as yup from "yup";

import { Schema } from "yup";

import { ISessionRequest } from "../interfaces";

export const createSessionSchema: Schema<ISessionRequest> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
