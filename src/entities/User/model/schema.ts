import * as yup from "yup";
import { User } from "..";

export const USER_CREATION_SCHEMA: yup.ObjectSchema<Omit<User, "userId">> =
  yup.object({
    name: yup.string().required("Required field"),
    surname: yup.string().required("Required field"),
    age: yup.string().required("Required field"),
    city: yup.string().required("Required field"),
  });
