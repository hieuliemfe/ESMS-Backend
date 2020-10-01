import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const config = configJson[env];
const db = {};

let sequelize;
console.log(config.databaseUrl);
if (config.databaseUrl) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(config.databaseUrl, {
    dialect: "mysql",
    protocol: "mysql",
    // dialect: "postgres",
    // protocol: "postgres",
    ssl: true,
    dialectOptions: { ssl: true },
    logging: true //false
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: "mysql",
    // dialect: "postgres",
    // ssl: true,
    // dialectOptions: { ssl: true },
    logging: console.log
  });
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
context.keys().map(context).forEach(({ default: module }) => {
  const sequelizeModel = module(sequelize, Sequelize);
  db[sequelizeModel.name] = sequelizeModel;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
