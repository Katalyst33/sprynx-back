import { Controller, Http } from "xpresser/types/http";
import CarPackageModel from "../models/CarPackageModel";

/**
 * CarPackagesController
 */
export = <Controller.Object>{
  // Controller Name
  name: "CarPackageController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */

  async addPackage(http: Http) {
    const newPackage = http.req.body;

    try {
      const serviceID = [];

      // save to database
      for (const serviceId of newPackage.serviceIds) {
        serviceID.push(CarPackageModel.id(serviceId));
      }

      const main = CarPackageModel.make({
        newPackage,
        serviceIds: serviceID,
      });

      

      return http.json({ message: "package created", main }, 201);
    } catch (e: any) {
      return http.status(500).json({ error: e.message });
    }
  },
};
