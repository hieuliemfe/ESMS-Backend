/* jshint indent: 1 */
import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  const Guideline = sequelize.define('Guideline', {
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    link: {
      type: DataTypes.TEXT,
      field: 'link'
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
    tableName: 'guideline',
  });

  return Guideline;
};
