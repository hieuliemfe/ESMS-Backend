/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    sessionStart: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'section_start'
    },
    sessionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'section_end'
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
    models.Session.hasMany(models.Section, {
      foreignKey: 'section_id'
    });
    return Session;
  }
};