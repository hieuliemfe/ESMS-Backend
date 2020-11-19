'use strict';

// import models from '../db/models/index';
import status from 'http-status';
import path from 'path'
const fs = require('fs');
export default {
  get_config: {
    async get(req, res, next) {
        console.log(`=============${process.env.ACTION_CONFIG_PATH}`)
        let config = JSON.parse(fs.readFileSync(path.join(__dirname + '/../' + process.env.ACTION_CONFIG_PATH)))
        try {  
        res.status(status.OK).send({
            success: true,
            message: config
        })
        } catch (error) {
        next(error);
        }
    }
  },
  update_config: {
    async post(req, res, next) {
        fs.writeFileSync(process.env.ACTION_CONFIG_PATH, req.body.config)
        try {  
        res.status(status.CREATED).send({
            success: true,
            message: 1
        })
        } catch (error) {
        next(error);
        }
    }
  },
};
