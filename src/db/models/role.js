/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_name'
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
    tableName: 'role',
  });

  Role.associate = function (models) {
    models.Role.hasMany(models.Employee, {
      foreignKey: "role_id"
    });
  }
  return Role;
};
