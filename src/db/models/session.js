/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    sessionStart: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'session_start'
    },
    sessionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'session_end'
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'session',
  });
  Session.associate = function (models) {
    models.Session.hasMany(models.Period, {
      foreignKey: 'session_id'
    });
    Session.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
  }
  return Session;
};