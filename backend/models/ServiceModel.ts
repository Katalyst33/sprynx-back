import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface ServiceModelDataType {
  updatedAt?: Date;
  createdAt: Date;
  title: string;
  description: string;
}

/**
 * ServiceModel Model
 * Collection: `service_models`
 */
class ServiceModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    title: is.String().required(),
    description: is.String().required(),
  };

  public data!: ServiceModelDataType;
}

/**
 * Map Model to Collection: `service_models`
 * .native() will be made available for use.
 */
UseCollection(ServiceModel, "service_models");

export default ServiceModel;
