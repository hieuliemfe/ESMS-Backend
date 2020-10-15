/* jshint indent: 1 */
export default function (sequelize, DataTypes) {
    const Shift = sequelize.define('Shift', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'employee_id'
        },
        counterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'counter_id'
        },
        shiftStart: {
            type: DataTypes.DATE,
            field: 'shift_start'
        },
        shiftEnd: {
            type: DataTypes.DATE,
            field: 'shift_end'
        },
    }, {
        tableName: 'shift',
    });
    return Shift;
};
