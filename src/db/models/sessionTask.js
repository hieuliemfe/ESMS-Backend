/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const SessionTask = sequelize.define('SessionTask', {
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'status_id',
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'session_id',
    },
    statusId: {
      type: DataTypes.INTEGER,
      field: 'status_id',
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'task_id',
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
    tableName: 'session_task',
  });

  SessionTask.associate = function (models) {
    SessionTask.belongsTo(models.Session, {
      targetKey: 'id',
      foreignKey: 'session_id',
      as: 'Session'
    });
    SessionTask.belongsTo(models.Task, {
      targetKey: 'id',
      foreignKey: 'task_id',
      as: 'Task'
    });
  };
  return SessionTask;
};
