import models from '../models/index.js';
import roleSeed from './roleSeed.js';
import userSeed from './userSeed.js';
import emotionSeed from './emotionSeed.js';

const seed = async () => {
    //check if data already exists.
    await models.Role.count()
        .then((count) => {
            //if there's no data, seed
            if (count == 0) {
                models.Role.bulkCreate(roleSeed)
                    .then(() => models.User.bulkCreate(userSeed))
                    .then(() => models.Emotion.bulkCreate(emotionSeed))
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
