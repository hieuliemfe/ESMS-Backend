/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    code: {
      type: DataTypes.STRING,
      field: 'code'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
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
    tableName: 'task',
  });

  Task.associate = function (models) {
    Task.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: 'Category'
    });
  }
  return Task;
};
