/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const SessionService = sequelize.define('SessionService', {
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
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'service_id',
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
    tableName: 'session_service',
  });

  SessionService.associate = function (models) {
    SessionService.belongsTo(models.Session, {
      targetKey: 'id',
      foreignKey: 'session_id',
      as: 'Session'
    });
    SessionService.belongsTo(models.Service, {
      targetKey: 'id',
      foreignKey: 'service_id',
      as: 'Service'
    });
  };
  return SessionService;
};
