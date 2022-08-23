import { Controller, Http } from "xpresser/types/http";

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
    return { message: "Hello World" };
  },

  ping(http: Http) {
    const user = http.state.get("currentUser");

    return http.send({
      user: user,
      AppInfo: {
        name: "Sprynx Multi App",
        version: "1.0.0",
        description: "Mobile Car wash Api",
      },
    });
  },
};

export = AppController;
