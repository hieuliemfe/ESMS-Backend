/* jshint indent: 1 */
export default function (sequelize, DataTypes) {
  const CounterCategory = sequelize.define('CounterCategory', {
    counterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'counter_id'
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
    tableName: 'counter_category',
  });
  CounterCategory.associate = function (models) {
    //A counter will handle multiple queue's categories.
    CounterCategory.belongsTo(models.Counter, {
      targetKey: 'id',
      foreignKey: 'counter_id',
      as: 'Counter'
    });
    CounterCategory.belongsTo(models.Category, {
      targetKey: 'id',
      foreignKey: 'category_id',
      as: 'Category'
    });
  };
  return CounterCategory;
};
