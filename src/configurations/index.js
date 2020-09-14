require('dotenv').config();

const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',

  DATABASE_URL: process.env.DATABASE_URL,

  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,

  FRONTEND_URL: process.env.FRONTEND_URL,
  HOST: process.env.HOST,
  PORT: process.env.PORT,

  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = publicRuntimeConfig;

// export const {
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_DB,
//   POSTGRES_HOST,
//   POSTGRES_PORT,
//
//   FRONTEND_URL,
//   HOST,
//   PORT,
//
//   JWT_SECRET,
// } = publicRuntimeConfig;

module.exports.default = publicRuntimeConfig.NODE_ENV === 'production';
