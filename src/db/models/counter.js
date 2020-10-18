/* jshint indent: 1 */

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
      defaultValue: new Date(),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
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
