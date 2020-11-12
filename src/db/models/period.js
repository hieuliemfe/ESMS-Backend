/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const Period = sequelize.define('Period', {
    periodStart: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'period_start',
      defaultValue: 0
    },
    periodEnd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'period_end',
      defaultValue: 0
    },
    emotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'emotion_id'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'duration'
    },
    sessionId: {
      type: DataTypes.INTEGER,
      field: 'session_id',
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
    tableName: 'period',
  });
  Period.associate = function (models) {
    Period.belongsTo(models.Emotion, { foreignKey: 'emotion_id', as: 'Emotion' });
    Period.belongsTo(models.Session, { foreignKey: 'session_id', as: 'Session' });
  }
  return Period;
};
