import { Controller, Http } from "xpresser/types/http";
import UserModel from "../models/UserModel";

const AppController = <Controller.Object>{
  /**
   * Controller name.
   * @type {string}
   */
  name: "AppController",

  /**
   * Index Method for "/"
   * @returns {string}
   */
  index() {
    return {
      message: "No index access allowed!",
    };
  },

  ping(http: Http) {
    // check if included in excluded routes

    //get user from server state coming from middleware ^^
    const user: UserModel | null = http.state.get("currentUser");

    return http.send({
      user: user
        ?.toCollection()
        .pick(["email", "lastSeenAt", "username", "role"]),

      AppInfo: {
        name: "Sprynx Multi App",
        version: "1.0.0",
        description: "Mobile Car wash Api",
      },
    });
  },
};

export = AppController;
