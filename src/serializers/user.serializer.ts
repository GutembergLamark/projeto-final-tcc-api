import * as yup from "yup";

import { Schema } from "yup";

import { IUserRequest } from "../interfaces";

export const createUserSchema: Schema<IUserRequest> = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "Username must contain at least 3 digits"),
  email: yup.string().required().email("Must be an email"),
  password: yup
    .string()
    .required()
    .matches(/[A-Z]/, "Password must contain at least 1 capital letter")
    .matches(/([a-z])/, "Password must contain at least 1 lowercase letter")
    .matches(/(\d)/, "Password must contain at least 1 number")
    .matches(/(\W)|_/, "Password must contain at least 1 special character")
    .matches(/.{8,}/, "Password must contain at least 8 digits"),
  cpf: yup
    .string()
    .required()
    .min(14, "The CPF must contain 14 digits. Ex: 999.999.999-99")
    .max(14, "The CPF must contain 14 digits. Ex: 999.999.999-99"),
});
