/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
    const Shift = sequelize.define('Shift', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        name: {
            type: DataTypes.STRING,
            unique: false,
            field: 'name'
        },
        shiftStart: {
            type: DataTypes.TIME,
            field: 'shift_start'
        },
        shiftEnd: {
            type: DataTypes.TIME,
            unique: false,
            field: 'shift_end'
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
        tableName: 'shift',
    });
    Shift.associate = function (models) {
        //A shift will have many sessions
        Shift.hasMany(models.EmployeeShift, {
          foreignKey: 'shift_id',
          as: 'Shift'
        });
      }
    return Shift;
};
