/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const NegativeEmotionCriteria = sequelize.define('NegativeEmotionCriteria', {
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'condition'
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'operator'
    },
    comparingNumber: {
      type: DataTypes.FLOAT,
      field: 'comparing_number'
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
    tableName: 'negative_emotion_criteria',
  });

  NegativeEmotionCriteria.associate = function (models) {
    models.NegativeEmotionCriteria.hasMany(models.NegativeEmotionAction, {
      foreignKey: "criteria_id"
    });
  }
  return NegativeEmotionCriteria;
};
