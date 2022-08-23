import { Controller, Http } from "xpresser/types/http";
import UserModel, { UserModelDataType } from "../models/UserModel";
import { compare, hash } from "@techie04/xpresser-bcrypt";
import { createToken } from "../export";

/**
 * AuthController
 */
export = <Controller.Object>{
  // Controller Name
  name: "AuthController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  async register(http: Http) {
    try {
      const { body } = http.req;

      // check if user already exists

      const existingUser = await UserModel.findOne({ email: body.email });
      if (existingUser) {
        return http
          .status(409)
          .send({ error: "user already exists, login instead" });
      }

      // hash password
      const hashedPassword = await hash(body.password);
      const user = UserModel.make({
        email: body.email,
        password: hashedPassword,
      });

      // save to database

      await user.save();
      return http.send({ message: "Registration Succesfull", user });
    } catch (e) {
      return http.status(400).send({ error: e });
    }
  },

  async login(http: Http, body: UserModelDataType) {
    try {
      const { body } = http.req;

      const existingUser = await UserModel.findOne({ email: body.email });

      let savedPassword: string = existingUser?.data.password as string;

      // check if user exists
      if (!existingUser) {
        return http.status(401).send({ error: "user not found" });
      }

      if (!compare(body.password, savedPassword)) throw "password incorrect";

      // generate token

      const token = createToken(existingUser.id().toString());

      await existingUser.update({ lastSeenAt: new Date() });
      return http.send({ message: "Login succesful ", token });
    } catch (e) {
      return http.status(400).send({ error: e });
    }
  },
};
