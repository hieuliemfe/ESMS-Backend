/* jshint indent: 1 */
import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_name'
    },
    subtitle : {
      type: DataTypes.STRING,
      field: 'subtitle'
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
    tableName: 'category',
  });

  Category.associate = function (models) {
    Category.hasMany(models.Queue, {
      foreignKey: "category_id",
      onDelete: 'cascade'
    });
    Category.hasMany(models.Task, {
      foreignKey: "category_id",
      onDelete: 'cascade'
    });
    Category.hasMany(models.CounterCategory, {
      foreignKey: "category_id",
      onDelete: 'cascade'
    });
  }
  return Category;
};
