/* jshint indent: 1 */
import { Sequelize } from 'sequelize';
import { SuspensionStatus } from '../config/statusConfig';

export default function (sequelize, DataTypes) {
  const Suspension = sequelize.define('Suspension', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    expiredOn: {
      type: DataTypes.DATE,
      field: 'expiration_time',
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      field: 'reason',
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      field: 'is_deleted',
      defaultValue: SuspensionStatus.NOT_DELETED,
    },
    employeeId: {
      type: DataTypes.UUID,
      unique: false,
      field: 'employee_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
      field: 'updated_at',
    }
  }, {
    tableName: 'suspension',
  });

  Suspension.associate = function (models) {
    Suspension.belongsTo(models.Employee, {
      //employee_id
      targetKey: 'id',
      foreignKey: 'employee_id',
      as: 'Employee'
    });
  }
  return Suspension;
};
