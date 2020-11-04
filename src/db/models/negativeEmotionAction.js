/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const NegativeEmotionAction = sequelize.define('NegativeEmotionAction', {
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'limit'
    },
    percentageLimit: {
      type: DataTypes.FLOAT,
      field: 'percentage_limit'
    },
    periodicityId: {
      type: DataTypes.INTEGER,
      field: "periodicity_id",
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'action'
    },
    criteriaId: {
      type: DataTypes.INTEGER,
      field: 'criteria_id'
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
    tableName: 'negative_emotion_action',
  });

  NegativeEmotionAction.associate = function (models) {
    models.NegativeEmotionAction.belongsTo(models.NegativeEmotionCriteria, {
      foreignKey: "criteria_id"
    });
  }
  return NegativeEmotionAction;
};
