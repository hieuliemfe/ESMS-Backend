# ESMS-Backend

### Cleaning & seeding the data when new codes are merged:

#### 1. In`src/index.js` file:
- Set the `force` value of db.sequelize.sync({**force: false**, logging: false }) to **true**.
- Save changes.

#### 2. Run the docker-compose file:
- On the terminal, type `sudo docker-compose up --build`.
- Wait until all 3 services are up and running.

#### 3. Seed the data:
- Access `localhost:4000/swagger` by a browser.
- Run the `/seed` API.

#### 4. Verify the seeded data:
- Access `localhost:8080` by a browser.
- Input necesarry info and login.
- Check the `user` || `role` || `emotion` table to verify.
