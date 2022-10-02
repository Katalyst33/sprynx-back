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
  async allPackages(http: Http) {
    const { limit } = http.req.body;

    const allPackages = await CarPackageModel.native()
      .aggregate([
        {
          $limit: limit || 10,
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

  async getPackage(http: Http) {
    const { uuid } = http.req.params;

    const carPackage = await CarPackageModel.native().findOne({ uuid });

    if (!carPackage) {
      return http.json({ message: "package not found" }, 404);
    }

    return http.json({ message: "fetched package", carPackage }, 200);
  },

  async updatePackage(http: Http) {
    const { uuid } = http.req.params;
    const { body } = http.req;

    const carPackage = await CarPackageModel.native().findOne({ uuid });

    if (!carPackage) {
      return http.json({ message: "car package not found" }, 404);
    }

    // update service

    const updatedService = await CarPackageModel.native().findOneAndUpdate(
      { uuid },
      { $set: body }
    );

    return http.json({ message: "updated Package" }, 200);
  },

  async deletePackage(http: Http) {
    const { uuid } = http.req.params;
    const { body } = http.req;

    const service = await CarPackageModel.native().findOne({ uuid });

    if (!service) {
      return http.json({ message: "Package not found" }, 404);
    }

    // delete service

    const deletedService = await CarPackageModel.native().findOneAndDelete({
      uuid,
    });

    // update service

    return http.json({ message: "Deleted service" }, 200);
  },
};
