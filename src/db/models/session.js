/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    sessionStart: {
      type: DataTypes.DATE,
      field: 'session_start'
    },
    sessionEnd: {
      type: DataTypes.DATE,
      field: 'session_end'
    },
    employeeId: {
      type: DataTypes.UUID,
      field: 'employee_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      field: 'updated_at'
    }
  }, {
    tableName: 'session',
  });
  Session.associate = function (models) {
    models.Session.hasMany(models.Period, {
      foreignKey: 'session_id'
    });
    models.Session.hasMany(models.Task, {
      foreignKey: 'session_id'
    });
    Session.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'Customer'
    });
    Session.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'Employee'
    });
  }
  return Session;
};
