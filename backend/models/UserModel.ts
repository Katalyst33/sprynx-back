import { is, XMongoSchema, XMongoModel, joi } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface UserModelDataType {
  updatedAt?: Date;
  createdAt: Date;
  avatar?: string;
  role?: Array<string>;
  lastname?: string;
  firstname?: string;
  email?: string;
  mobile?: string;
  password?: string;
}

/**
 * UserModel Model
 * Collection: `user_models`
 */
class UserModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    lastSeenAt: is.Date(),
    createdAt: is.Date().required(),
    avatar: is.String().optional(),
    role: is.Array(() => ["user"]).optional(),
    lastname: is.String().optional(),
    firstname: is.String().optional(),
    email: joi.string().email().required(),
    mobile: is.String().optional(),
    password: is.String().required(),
  };

  public data!: UserModelDataType;
}

/**
 * Map Model to Collection: `user_models`
 * .native() will be made available for use.
 */
UseCollection(UserModel, "user_models");

export default UserModel;
