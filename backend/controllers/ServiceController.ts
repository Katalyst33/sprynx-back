import { Controller, Http } from "xpresser/types/http";
import ServiceModel from "../models/ServiceModel";

/**
 * ServiceController
 */
export = <Controller.Object>{
  // Controller Name
  name: "ServiceController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  async allServices(http: Http) {
    const { limit } = http.req.body;
    console.log(limit);

    // get all services

    const allServices = await ServiceModel.native()
      .find({})
      .limit(limit || 10)
      .toArray();

    return http.json({ message: "fetched all services", allServices }, 200);
  },

  async addService(http: Http) {
    const body = http.req.body;

    try {
      // check if service already exists
      const itExist = await ServiceModel.native().findOne({
        title: body.title,
        description: body.description,
      });

      if (itExist) {
        return http.json({ message: "service already exists" }, 400);
      }

      // save to database
      const newService = ServiceModel.make(body);

      await newService.save();

      console.log(newService);

      //   await newService.save();
      return http.json({ message: "created service", newService }, 201);
    } catch (e: any) {
      return http.status(500).json({ error: e.message });
    }
  },

  async getService(http: Http) {
    const { uuid } = http.req.params;

    const service = await ServiceModel.native().findOne({ uuid });

    if (!service) {
      return http.json({ message: "service not found" }, 404);
    }

    return http.json({ message: "fetched service", service }, 200);
  },

  async updateService(http: Http) {
    const { uuid } = http.req.params;
    const { body } = http.req;

    const service = await ServiceModel.native().findOne({ uuid });

    if (!service) {
      return http.json({ message: "service not found" }, 404);
    }

    // update service

    const updatedService = await ServiceModel.native().findOneAndUpdate(
      { uuid },
      { $set: body }
    );

    return http.json({ message: "updated service" }, 200);
  },
  async deleteService(http: Http) {
    const { uuid } = http.req.params;
    const { body } = http.req;

    const service = await ServiceModel.native().findOne({ uuid });

    if (!service) {
      return http.json({ message: "service not found" }, 404);
    }

    // delete service

    const deletedService = await ServiceModel.native().findOneAndDelete({
      uuid,
    });

    // update service

    return http.json({ message: "Deleted service" }, 200);
  },
};
