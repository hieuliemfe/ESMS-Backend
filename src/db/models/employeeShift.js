/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const EmployeeShift = sequelize.define('EmployeeShift', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    employeeId: {
      type: DataTypes.UUID,
      unique: false,
      field: 'employee_id'
    },
    counterId: {
      type: DataTypes.INTEGER,
      unique: false,
      field: 'counter_id'
    },
    shiftDate: {
      type: DataTypes.DATEONLY,
      field: 'shift_date'
    },
    statusId: {
      type: DataTypes.INTEGER,
      field: 'status_id',
    },
    shiftId: {
      type: DataTypes.INTEGER,
      field: 'shift_id'
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
    tableName: 'employee_shift',
  });
  EmployeeShift.associate = function (models) {
    //A shift will have many sessions
    EmployeeShift.hasMany(models.Session, {
      foreignKey: 'employee_shift_id',
      as: 'Session'
    });
    //A shift type can have many shifts
    EmployeeShift.belongsTo(models.Shift, {
      //shift_type_id
      targetKey: 'id',
      foreignKey: 'shift_id',
      as: 'Shift'
    });
    //A counter can have many shifts
    EmployeeShift.belongsTo(models.Counter, {
      //counter_id
      targetKey: 'id',
      foreignKey: 'counter_id',
      as: 'Counter'
    });
    //An employee can have many shifts
    EmployeeShift.belongsTo(models.Employee, {
      //employee_id
      targetKey: 'id',
      foreignKey: 'employee_id',
      as: 'Employee'
    });
  }
  return EmployeeShift;
};
