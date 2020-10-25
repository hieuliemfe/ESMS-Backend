/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const Queue = sequelize.define('Queue', {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'number'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
    },
    statusId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: 'status_id'
    },
    counterId: {
      type: DataTypes.INTEGER,
      field: 'counter_id'
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
    tableName: 'queue',
  });
  Queue.associate = function (models) {
    Queue.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'Category'
    });
    Queue.belongsTo(models.Counter, {
      foreignKey: 'counter_id',
      as: 'Counter'
    });
  }
  return Queue;
};
