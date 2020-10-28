/* jshint indent: 1 */
import { Sequelize } from 'sequelize'

export default function (sequelize, DataTypes) {
  const Counter = sequelize.define('Counter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'number'
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
    tableName: 'counter',
  });

  Counter.associate = function (models) {
    //A counter will have many queues from customers.
    Counter.hasMany(models.Queue, {
      as: 'Queue',
      foreignKey: 'counter_id',
    });
  }
  return Counter;
};
