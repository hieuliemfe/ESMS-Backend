/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
    const Counter = sequelize.define('Counter', {
        counterName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'counter_name'
        },
        counterNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'counter_number'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        tableName: 'counter',
    });

    Counter.associate = function (models) {
        Counter.belongsToMany(models.Category, {
            through: "counter_category",
            foreignKey: 'counter_id',
        });
        Counter.belongsToMany(models.Employee, {
            as: 'Employee',
            through: models.Shift,
            foreignKey: 'counter_id',
        });
        Counter.hasMany(models.Queue, {
            as: 'Queue',
            foreignKey: 'counter_id',
        });
    }
    return Counter;
};
