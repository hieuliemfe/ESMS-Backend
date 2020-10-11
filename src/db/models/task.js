/* jshint indent: 1 */

import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, DataTypes) {
    const Task = sequelize.define('Task', {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'task_name'
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'description'
        },
        employeeId: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            field: 'employee_id',
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
        tableName: 'task',
    });
    Task.associate = function (models) {
        Task.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'Employee' });
    }
    return Task;
};
