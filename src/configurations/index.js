import dotenv from 'dotenv'
dotenv.config({ path: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}` });

const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  //DB Configs
  DATABASE_URL: process.env.DATABASE_URL,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  //BE Configs
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  //GCS Configs
  GCS_EVIDENCE_PROJECT_ID: process.env.GCS_EVIDENCE_PROJECT_ID,
  GCS_EVIDENCE_CREDENTIAL: process.env.GCS_EVIDENCE_CREDENTIAL,
  GCS_EVIDENCE_BUCKET_NAME: process.env.GCS_EVIDENCE_BUCKET_NAME,
  //Email service Configs
  EMAIL_SERVICE_DKIM_KEY: process.env.EMAIL_SERVICE_DKIM_KEY,
  
  JWT_SECRET: process.env.JWT_SECRET,
};
export default publicRuntimeConfig;
