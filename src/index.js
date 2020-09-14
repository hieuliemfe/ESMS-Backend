import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes';
import status from 'http-status';
import cors from 'cors';
import { handleError } from './utils/errorHandler';
import db from './db/models';
import passport from 'passport';
import { FRONTEND_URL } from './configurations';
import { swaggerDocument } from "./configurations/swagger.js";

const swaggerUi = require('swagger-ui-express');

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error.message);
  });
db.sequelize.sync({ force: true, logging: false });

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./services/passport')(passport);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer: true}));

Router.forEach(route => {
  app.use(route.path, route.handler);
});

app.use((req, res, next) => {
  return res.status(status.NOT_FOUND)
    .send({
      success: false,
      error: 'Page not found!',
    });
});

// Global error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;