/**
 * Your Config File.
 * See https://xpresserjs.com/configuration/
 */
import path = require("path");
const base = path.resolve(`${__dirname}`);
export = {
  // name of app
  name: "Xpresser-Simple-Typescript-App",

  // app environment
  env: "development",

  /**
   * By default xpresser sets this for you.
   */
  server: {
    domain: "localhost",
    // Server Port
    port: 5300,
    use: { cors: true, bodyParser: true, ngrok: true, helmet: false },
  },

  /**
   * Path settings.
   */
  mongodb: {
    url: "mongodb://127.0.0.1:27017",
    database: "sprynxDb",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  paths: {
    /**
     * Base Folder
     * Where this app is called from.
     *
     * Best value for this is: __dirname
     */
    base: base,

    /**
     * Point routes file to routes.ts
     */
    routesFile: "backend://routes.ts",
  },
  bcrypt: {
    salt: 10,
  },
};
