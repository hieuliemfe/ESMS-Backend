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

    return ShiftType;
};
