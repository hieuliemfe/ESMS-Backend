'use strict'

import models from '../models/index';
import roleSeed from './roleSeed';
import employeeSeed from './employeeSeed';
import emotionSeed from './emotionSeed';
import customerSeed from './customerSeed';
import categorySeed from './categorySeed';
import queueSeed from './queueSeed';
import counterSeed from './counterSeed';
import sessionSeed from './sessionSeed';
import taskSeed from './taskSeed';
//junction seeds
import sessionTaskSeed from './sessionTaskSeed';
import counterCategorySeed from './counterCategorySeed';
import shiftSeed from './shiftSeed';

const seed = async () => {
  //check if data already exists.
  await models.Role.count()
    .then((count) => {
      //if there's no data, seed
      if (count == 0) {
        models.Role.bulkCreate(roleSeed)
          //library seeds
          .then(() => models.Emotion.bulkCreate(emotionSeed))
          .then(() => models.Category.bulkCreate(categorySeed))
          //sample data seeds
          .then(() => models.Counter.bulkCreate(counterSeed))
          .then(() => models.Employee.bulkCreate(employeeSeed))
          .then(() => models.Customer.bulkCreate(customerSeed))
          .then(() => models.Queue.bulkCreate(queueSeed))
          .then(() => models.Task.bulkCreate(taskSeed))
          //junction seeds
          .then(() => models.CounterCategory.bulkCreate(counterCategorySeed))
          .then(() => models.Shift.bulkCreate(shiftSeed))
          .then(() => models.Session.bulkCreate(sessionSeed))
          .then(() => models.SessionTask.bulkCreate(sessionTaskSeed))
          .then((res, err) => {
            if (err) {
              console.log(`ERROR at seeding data: ${err}`);
            } else {
              console.log("Data seeding successfully.");
            }
          })
      } else {
        console.log("Data synced. No seeding action was started.")
      }
    });
};

export default seed;
