import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface CarPackageModelDataType {
  updatedAt?: Date;
  createdAt: Date;
  uuid: string;
  title: string;
  description: string;
  regularCar: number;
  duration: string;
  largeCar: number;
  logistics: string;
  serviceIds: [];
}

/**
 * CarPackageModel Model
 * Collection: `car_package_models`
 */
class CarPackageModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    uuid: is.Uuid().required(),
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    title: is.String().required(),
    description: is.String().required(),
    regularCar: is.Number().required(),
    duration: is.String().required(),
    largeCar: is.Number().required(),
    logistics: is.String().required(),
    serviceIds: is.Array().required(),
  };

  public data!: CarPackageModelDataType;
}

/**
 * Map Model to Collection: `car_package_models`
 * .native() will be made available for use.
 */
UseCollection(CarPackageModel, "car_package_model");

export default CarPackageModel;
