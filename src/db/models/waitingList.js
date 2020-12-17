/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const WaitingList = sequelize.define('WaitingList', {
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
    counterId: {
      type: DataTypes.INTEGER,
      field: 'counter_id'
    },
    customerName: {
      type: DataTypes.STRING,
      field: 'customer_name'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    tableName: 'waiting_list',
  });
  WaitingList.associate = function (models) {
    WaitingList.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'Category'
    });
    WaitingList.belongsTo(models.Counter, {
      foreignKey: 'counter_id',
      as: 'Counter'
    });
  }
  return WaitingList;
};
