import { getInstanceRouter } from "xpresser";
/**
 * See https://xpresserjs.com/router/
 */
const Route = getInstanceRouter();

/**
 * Url: "/" points to AppController@index
 * The index method of the controller.
 */

//guest routes

Route.path("/api", () => {
  // Route.get("/", "App@index").name("index");
  Route.get("/ping", "App@ping");
})
  .controller("App")
  .middlewares(["Auth.validateAuth"]);

Route.path("/api", () => {
  Route.path("/services/", () => {
    Route.post("all-services", "Service@allServices");
    Route.post("add-service", "Service@addService");
    Route.delete("delete-service/:uuid", "Service@deleteService");
    Route.get("one-service/:uuid", "Service@getService");
    Route.post("update-service/:uuid", "Service@updateService");
  });
  Route.path("/packages/", () => {
    Route.post("all-packages", "CarPackage@allPackages");
    Route.post("add-package", "CarPackage@addPackage");
    Route.get("get-package/:uuid", "CarPackage@getPackage");
    Route.post("update-package/:uuid", "CarPackage@updatePackage");
    Route.delete("delete-package/:uuid", "CarPackage@deletePackage");
  });

  Route.post("/register", "Auth@register");
  Route.post("/login", "Auth@login");
  // Route.post("/make-booking", "Account@bookings");
});

//guest routes
/* 
//account routes
Route.path("/api/account", () => {
  // bookings
  Route.get("/all-bookings", "Booking@allBookings");
  Route.post("/add-bookings", "Booking@addBooking");
  Route.post("/cancel-bookings", "Booking@cancelBooking");

  // bookings

  // profile
  Route.get("/get-account", "Account@getAccount");
  Route.get("/update-account", "Account@updateAccount");
  Route.get("/update-password", "Account@updatePassword");
  // profile
})
  .controller("Account")
  .middlewares(["Auth.validateAuth"]); */
//account routes

// manager routes
/* Route.path("/api/manager", () => {
  //packages
  Route.post("/all-packages", "CarPackage@allPackages");
  Route.post("/add-package", "CarPackage@addPackage");
  Route.patch("/update-package", "CarPackage@updatePackage");
  Route.delete("/delete-package", "CarPackage@deletePackage");
  //services
  Route.post("/all-services", "Service@allServices");
  Route.post("/add-service", "Service@addService");
  Route.patch("/update-service", "Service@updateService");
  Route.delete("/delete-service", "Service@deleteService");
  //services
  //users
  Route.post("/all-users", "Account@allUsers");
  Route.post("/add-user", "Account@addUser");
  Route.patch("/update-user", "Account@updateUser");
  Route.patch("/block-user", "Account@blockUser");
  //users

  //bookings
  Route.post("/add-booking", "Booking@addBooking");
  Route.post("/all-bookings", "Booking@allBookings");
  Route.post("/update-bookings", "Booking@updateBooking");
  Route.post("/delete-bookings", "Booking@deleteBooking");
}); */
// manager routes

//packages
