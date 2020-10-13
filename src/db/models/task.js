/* jshint indent: 1 */

import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
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
        statusId: {
            type: DataTypes.INTEGER,
            field: 'status_id',
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
        Task.belongsToMany(models.Employee, {
            as: 'Employee',
            through: "employee_task",
            foreignKey: 'task_id',
        });
        Task.belongsTo(models.Status, {
            foreignKey: 'status_id',
            as: 'Status',
        });
        Task.belongsTo(models.TaskType, {
            foreignKey: 'task_type_id',
            as: 'TaskType',
        });
    };
    return Task;
};
