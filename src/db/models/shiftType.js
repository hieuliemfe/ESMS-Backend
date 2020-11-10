/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
    const ShiftType = sequelize.define('ShiftType', {
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
        tableName: 'shift_type',
    });
    ShiftType.associate = function (models) {
        //A shift will have many sessions
        ShiftType.hasMany(models.Shift, {
          foreignKey: 'shift_type_id',
          as: 'ShiftType'
        });
      }
    return ShiftType;
};
