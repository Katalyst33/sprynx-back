/**
 * Your Config File.
 * See https://xpresserjs.com/configuration/
 */
import path = require("path");
import env from "./env";

const base = path.resolve(`${__dirname}`);
export = {
    // name of app
    name: "sprynx-server",

    // app environment
    env: env.NODE_ENV,
    server: {
        domain: env.APP_DOMAIN,
        port: env.APP_PORT,
        use: {cors: true, bodyParser: true, ngrok: true, helmet: false},
    },
    /**
     */
    mongodb: {
        url: env.DB_SERVER,
        database: env.DB_NAME,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    paths: {
        base: base,
        routesFile: "backend://routes.ts",
    },
    bcrypt: {
        salt: 10,
    },
};
