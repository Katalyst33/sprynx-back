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
    const body = http.req.body;

    console.log(body);

    try {
      const newPackage = CarPackageModel.make(body);

      await newPackage.save();

      return http.json({ message: "package created", newPackage }, 201);
    } catch (e: any) {
      return http.status(500).json({ error: e.message });
    }
  },

  async allPackages(http: Http) {
    const { limit } = http.req.body;

    const allPackages = await CarPackageModel.native()
      .aggregate([
        {
          $limit: limit,
        },
        //look up array of serviceId
        {
          $lookup: {
            from: "service_models",
            localField: "serviceIds",
            foreignField: "uuid",
            as: "services",
          },
        },
        {
          $project: {
            serviceIds: 0,
          },
        },
        //unwind the array of services
      ])
      .toArray();

    return http.json({ message: "fetched all packages", allPackages }, 200);
  },
};
