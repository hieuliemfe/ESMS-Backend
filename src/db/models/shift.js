/* jshint indent: 1 */
export default function (sequelize, DataTypes) {
  const Shift = sequelize.define('Shift', {
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
    shiftStart: {
      type: DataTypes.DATE,
      field: 'shift_start'
    },
    shiftEnd: {
      type: DataTypes.DATE,
      field: 'shift_end'
    },
  }, {
    tableName: 'shift',
  });
  Shift.associate = function (models) {
    //A counter can have many shifts
    Shift.belongsTo(models.Counter, {
      //counter_id
      targetKey: 'id',
      foreignKey: 'counter_id',
      as: 'Counter'
    });
    //An employee can have many shifts
    Shift.belongsTo(models.Employee, {
      //employee_id
      targetKey: 'id',
      foreignKey: 'employee_id',
      as: 'Employee'
    });
  }
  return Shift;
};
