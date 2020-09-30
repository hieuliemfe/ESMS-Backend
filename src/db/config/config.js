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

// import publicRuntimeConfig from '../../configurations';
// const {
//   DATABASE_URL,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_HOST,
//   POSTGRES_PORT
// } = publicRuntimeConfig;

// export default {
//   development: {
//     databaseUrl: DATABASE_URL,
//     database: POSTGRES_DB,
//     username: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//     host: POSTGRES_HOST,
//     port: POSTGRES_PORT,
//     dialect: "postgres",
//     protocol: "postgres",
//     // ssl: true,
//     // dialectOptions: { ssl: true },
//   },

//   production: {
//     databaseUrl: DATABASE_URL,
//     database: POSTGRES_DB,
//     username: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//     host: POSTGRES_HOST,
//     port: POSTGRES_PORT,
//     dialect: "postgres",
//     protocol: "postgres",
//     ssl: true,
//     dialectOptions: { ssl: true },
//   }
// };
