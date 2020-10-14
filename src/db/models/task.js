/* jshint indent: 1 */

import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
        statusId: {
            type: DataTypes.INTEGER,
            field: 'status_id',
        },
        taskTypeId: {
            type: DataTypes.INTEGER,
            field: 'task_type_id',
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
        Task.belongsTo(models.Status, {
            foreignKey: 'status_id',
            as: 'Status',
        });
        Task.belongsTo(models.TaskType, {
            foreignKey: 'task_type_id',
            as: 'TaskType',
        });
        Task.belongsTo(models.Session, {
            foreignKey: 'session_id',
            as: 'Session',
        });
    };
    return Task;
};
