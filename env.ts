import { Env } from "@xpresser/env";

const baseFolder = __filename.includes(".js") ? `${__dirname}/../` : __dirname;

const env = Env(baseFolder, {
    NODE_ENV: Env.is.enum(["development", "production", "test"] as const, "development"),
    APP_PORT: Env.is.number(5330),
    APP_DOMAIN: Env.is.string("localhost"),
    DB_SERVER: Env.is.string("mongodb://127.0.0.1:27017"),
    DB_NAME: Env.is.string("H2o"),
});

// create isDev
export const isDev = env.NODE_ENV === "development";
export default env;
