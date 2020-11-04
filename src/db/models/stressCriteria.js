/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const StressCriteria = sequelize.define('StressCriteria', {
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
    tableName: 'stress_criteria',
  });

  StressCriteria.associate = function (models) {
    models.StressCriteria.hasMany(models.StressSuggestion, {
      foreignKey: "criteria_id"
    });
  }
  return StressCriteria;
};
