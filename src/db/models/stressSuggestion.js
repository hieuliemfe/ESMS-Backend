/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const StressSuggestion = sequelize.define('StressSuggestion', {
    limit: {
      type: DataTypes.INTEGER,
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
    link: {
      type: DataTypes.STRING,
      field: "link",
    },
    suggestion: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'suggestion'
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
    tableName: 'stress_suggestion',
  });

  StressSuggestion.associate = function (models) {
    models.StressSuggestion.belongsTo(models.StressCriteria, {
      foreignKey: "criteria_id"
    });
  }
  return StressSuggestion;
};
