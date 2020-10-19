/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Status = sequelize.define('Status', {
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status_name'
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
    tableName: 'status',
  });

  Status.associate = function (models) {
    Status.hasMany(models.SessionTask, {
      foreignKey: "status_id"
    });
  }
  return Status;
};
