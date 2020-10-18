/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_name'
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
    tableName: 'role',
  });

  Role.associate = function (models) {
    models.Role.hasMany(models.Employee, {
      foreignKey: "role_id"
    });
  }
  return Role;
};
