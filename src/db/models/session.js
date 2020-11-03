/* jshint indent: 1 */
import { Sequelize } from 'sequelize'

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
    info: {
      type: DataTypes.STRING(1000),
      field: 'info',
    },
    evidenceUrl: {
      type: DataTypes.STRING(1000),
      field: 'evidence_url'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
      field: 'updated_at'
    }
  }, {
    tableName: 'session',
  });
  Session.associate = function (models) {
    Session.hasMany(models.Period, {
      foreignKey: 'session_id',
      as: 'Period'
    });
    Session.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'Customer'
    });
    //A session can be only in a shift
    Session.belongsTo(models.Shift, {
      foreignKey: 'shift_id',
      as: 'Shift'
    });
  }
  return Session;
};
