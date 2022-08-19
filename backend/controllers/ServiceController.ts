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

    const services = [
      {
        id: 235,
        title: "Exterior",
        description: "Exterior cleaning",
      },
      {
        id: 236,
        title: "Interior",
        description: "Interior cleaning",
      },
      {
        id: 237,
        title: "Engine",
        description: "Engine cleaning",
      },
      {
        id: 661,
        title: "Full cleaning",
        description: "we will clean up and dwon for you",
      },
    ];

    // get all services

    const allServices = await ServiceModel.native()
      .find({})
      .limit(limit)
      .toArray();

    return http.json({ message: "fetched all services", allServices }, 200);
  },

  async createService(http: Http) {
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
};
