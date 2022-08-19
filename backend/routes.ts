import { getInstanceRouter } from "xpresser";
/**
 * See https://xpresserjs.com/router/
 */
const Route = getInstanceRouter();

/**
 * Url: "/" points to AppController@index
 * The index method of the controller.
 */

Route.path("/api", () => {
  Route.get("/", "App@index").name("index");
  Route.post("/services", "Service@allServices");
  Route.post("/add-package", "CarPackage@addPackage");
  Route.post("/add-service", "Service@createService");
  Route.post("/register", "Auth@register");
  Route.post("/login", "Auth@login");
});
//packages
