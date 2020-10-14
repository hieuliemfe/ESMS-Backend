import models from '../models/index';
import roleSeed from './roleSeed';
import employeeSeed from './employeeSeed';
import emotionSeed from './emotionSeed';
import customerSeed from './customerSeed';
import statusSeed from './statusSeed';
import categorySeed from './categorySeed';
import queueSeed from './queueSeed';
import taskTypeSeed from './taskTypeSeed';
import counterSeed from './counterSeed';
import counterCategorySeed from './counterCategorySeed';
const seed = async () => {
    //check if data already exists.
    await models.Role.count()
        .then((count) => {
            //if there's no data, seed
            if (count == 0) {
                models.Role.bulkCreate(roleSeed)
                    .then(() => models.Employee.bulkCreate(employeeSeed))
                    .then(() => models.Emotion.bulkCreate(emotionSeed))
                    .then(() => models.Customer.bulkCreate(customerSeed))
                    .then(() => models.Status.bulkCreate(statusSeed))
                    .then(() => models.Category.bulkCreate(categorySeed))
                    .then(() => models.TaskType.bulkCreate(taskTypeSeed))
                    .then(() => models.Queue.bulkCreate(queueSeed))
                    .then(() => models.Counter.bulkCreate(counterSeed))
                    //seed junction tables
                    .then(() => models.CounterCategory.bulkCreate(counterCategorySeed))
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
