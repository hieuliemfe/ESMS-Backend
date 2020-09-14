/* jshint indent: 1 */
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid.v4,
      primaryKey: true,
      field: 'id',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    fullname: {
      type: DataTypes.STRING,
      field: 'fullname'
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number'
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'avatar_url'
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_subscribed'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_deleted'
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
    tableName: 'user',
    hooks: {
      // This hook is called when an entry is being added to the back end.
      // This method is used to hash the password before storing it
      // in our database.
      beforeCreate: (user, options) => {
        const SALT_WORK_FACTOR = 10;
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    }
  });

  User.associate = function (models) {
    // models.User.hasMany(models.Post, {
    //   foreignKey: 'user_id'
    // });
    // models.User.hasMany(models.Follow, {
    //   foreignKey: 'user_id'
    // });
    // models.User.hasMany(models.Like, {
    //   foreignKey: 'user_id'
    // })
    // models.User.hasMany(models.Comment, {
    //   foreignKey: 'user_id'
    // })
  }
  return User;
};
