import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes';
import status from 'http-status';
import cors from 'cors';
import { handleError } from './utils/errorHandler';
import db from './db/models';
import passport from 'passport';
import publicRuntimeConfig from './configurations';
const FRONTEND_URL = publicRuntimeConfig.FRONTEND_URL;
import passport_service from './services/passport';
global.__basedir = __dirname + "/..";


//Swagger Config
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
var swaggerDefinition = {
  info: {
    title: 'ESMS Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: '0.0.0.0:4000',
  basePath: '/',
};
// options for the swagger docs
var options = {
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['src/routes/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error.message);
  });
db.sequelize.sync({ force: false, logging: false });

const app = express();
// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
passport_service(passport);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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