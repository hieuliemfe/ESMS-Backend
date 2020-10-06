/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  const Section = sequelize.define('Section', {
    sectionStart: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'section_start'
    },
    sectionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'section_end'
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
    tableName: 'section',
  });
  return Section;
};