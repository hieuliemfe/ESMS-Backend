'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        id: '468ab892-7518-4520-8243-db1c1b9607dd',
        username: 'AnhBui',
        fullname: 'Bui Nguyen Phuong Anh',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        email: 'space@potato.com',
        phone_number: '0123456789',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_mitsuki.jpg?alt=media&token=136252c1-b7fb-45ea-bf88-fc08923ede81',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      },
      {
        id: 'bfad3537-875c-4bf2-bb97-41c00b912d76',
        username: 'Potato',
        fullname: 'Nguyen Van Anh',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        email: 'potato@potato.com',
        phone_number: '0987654321',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_none.png?alt=media&token=99b44006-6136-4c11-8f8c-3f82d65483e6',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 2
      },
      {
        id: '9903c282-06ed-48fe-9607-76e7903f6b72',
        username: 'BinhPham',
        fullname: 'Pham Duc Binh',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        email: 'binh@pham.com',
        phone_number: '0321456789',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_binh.jpg?alt=media&token=57fb0d7f-4692-4560-b29c-5275e33d6ad6',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      },
      {
        id: 'ef71e125-37b5-4a5f-87e1-fdda43a4ccb2',
        username: 'DucPhi',
        fullname: 'Phi Do Hong Duc',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        email: 'duc@phi.com',
        phone_number: '0456123789',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_duc.jpg?alt=media&token=389bf32e-1e1d-4662-9875-914b424d74cf',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      },
      {
        id: 'da9c7b32-0f05-48f7-b74d-d052df2347d2',
        username: 'LocTran',
        fullname: 'Tran Thien Loc',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        email: 'loc@tran.com',
        phone_number: '0987456123',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_loc.jpg?alt=media&token=bdfaa794-c6ea-4658-860a-26f3759855a4',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      },
      {
        id: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
        username: 'admin',
        password: '$2a$10$rc8ARtv74lGR.SUI/CgUxuox3qjSri307g8g2k2BSWrzd0nTB2QRK',
        fullname: 'Full Admin Name',
        email: 'admin@admin.com',
        is_subscribed: true,
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_none.png?alt=media&token=99b44006-6136-4c11-8f8c-3f82d65483e6',
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      },
    ]);
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
