'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role', [
      {
        role_name: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'Manager',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'Employee',
        created_at: new Date(),
        updated_at: new Date()
      }

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
