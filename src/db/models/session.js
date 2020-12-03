/* jshint indent: 1 */
import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    sessionStart: {
      type: DataTypes.DATE,
      field: 'session_start',
      defaultValue: Sequelize.fn('NOW'),
    },
    sessionEnd: {
      type: DataTypes.DATE,
      field: 'session_end',
    },
    sessionDuration:{
      type: DataTypes.INTEGER,
      field: 'session_duration',
      allowNull: false,
      defaultValue: 0,
    },
    employeeId: {
      type: DataTypes.UUID,
      field: 'employee_id',
    },
    info: {
      type: DataTypes.TEXT,
      field: 'info',
    },
    angryWarningCount: {
      type: DataTypes.INTEGER,
      field: 'angry_warning_count',
      allowNull: false,
      defaultValue: 0,
    },
    evidenceUrl: {
      type: DataTypes.TEXT,
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
    Session.belongsTo(models.EmployeeShift, {
      foreignKey: 'employee_shift_id',
      as: 'EmployeeShift'
    });
  }
  return Session;
};
