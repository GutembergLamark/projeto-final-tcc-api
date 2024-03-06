import * as yup from "yup";

import { Schema } from "yup";

import { IBookRequest } from "../interfaces";

export const createBookSchema: Schema<IBookRequest> = yup.object().shape({
  title: yup
    .string()
    .required("O título é obrigatório")
    .max(50, "O título pode ter no máximo 50 caracters"),
  author: yup
    .string()
    .required("O autor é obrigatório")
    .max(100, "O nome do autor pode ter no máximo 100 caracters"),
  published_date: yup.date().required("A data é obrigatória"),
  synopsis: yup
    .string()
    .required("A sinopse é obrigatória")
    .max(200, "A sinopse pode ter no máximo 200 caracters"),
  pages: yup.number().required("O número de páginas é obrigatório"),
});
