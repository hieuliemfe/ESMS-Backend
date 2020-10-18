/* jshint indent: 1 */

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
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'task_id',
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
    tableName: 'session_task',
  });
  
  SessionTask.associate = function (models) {
    SessionTask.belongsTo(models.Session, {
      targetKey: 'id',
      foreignKey: "session_id",
      as: 'Session'
    });
    SessionTask.belongsTo(models.Task, {
      targetKey: 'id',
      foreignKey: "task_id",
      as: 'Task'
    });
    SessionTask.belongsTo(models.Status, {
      targetKey: 'id',
      foreignKey: "status_id",
      as: 'Status'
    });
  };
  return SessionTask;
};
