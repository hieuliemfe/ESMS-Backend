import models from '../models/index.js';
import roles from './seedRole.js';
import users from './seedUser.js';
import emotion from './seedEmotion.js';
const seed = async () => {
    //check if data already exists.
    await models.Role.count()
        .then((count) => {
            //if there's no data, seed
            if (count == 0) {
                models.Role.bulkCreate(roles)
                    .then(() => models.Emotion.bulkCreate(emotion))
                    .then(() => models.User.bulkCreate(users))
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