import publicRuntimeConfig from '../../configurations';
const {
  DATABASE_URL,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT
} = publicRuntimeConfig;

export default {
  development: {
    databaseUrl: DATABASE_URL,
    database: MYSQL_DB,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: "mysql",
    protocol: "mysql",
    // ssl: true,
    // dialectOptions: { ssl: true },
  },

  production: {
    databaseUrl: DATABASE_URL,
    database: MYSQL_DB,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: "mysql",
    protocol: "mysql",
    ssl: true,
    dialectOptions: { ssl: true },
  }
};
