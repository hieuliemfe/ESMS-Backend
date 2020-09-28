import publicRuntimeConfig from '../../configurations';
const {
  DATABASE_URL,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT
} = publicRuntimeConfig;

export default {
  development: {
    databaseUrl: DATABASE_URL,
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: "postgres",
    protocol: "postgres",
    // ssl: true,
    // dialectOptions: { ssl: true },
  },

  production: {
    databaseUrl: DATABASE_URL,
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: { ssl: true },
  }
};
