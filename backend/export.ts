import { sign } from "jsonwebtoken";

export const createToken = (id: any) => {
  return sign({ id }, "appSecret", { expiresIn: "1d" });
};
