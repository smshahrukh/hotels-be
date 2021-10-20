import appConfig from "./env";

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = appConfig;

export default {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
}
