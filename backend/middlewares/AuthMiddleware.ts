import { Http } from "xpresser/types/http";

import { verify } from "jsonwebtoken";
import UserModel from "../models/UserModel";

/**
 * AuthMiddleware
 */
export = {
  /**
   * Default Middleware Action
   * @param {Xpresser.Http} http
   */
  async validateAuth(http: Http) {
    // get token from header
    const authToken = http.req.headers["id-card"] as string;

    // check if token is valid
    if (!authToken) {
      // return http.status(200).send({ message: "you are not logged in" });

      return http.next();
    }

    try {
      // verify JWT token
      const verified = verify(authToken, "appSecret") as any;

      // save to state
      http.state.set("authUser", UserModel.id(verified.id));

      // check if user exists in state
      if (http.state.has("authUser")) {
        const user = await UserModel.findById(http.state.get("authUser"));

        // set state
        http.state.set("currentUser", user);
      }

      // run check here

      // console.log("verified", verified?.id);
      http.next();
    } catch {
      http.next();
    }
  },
  /*   getCurrentUser(http: Http): any {
    console.log("get  current user");
    // run check here

    return http.next();
  }, */
};
