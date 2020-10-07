/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
  var Emotion = sequelize.define('Emotion', {
    emotionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'emotion_name'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
    tableName: 'emotion',
  });

  Emotion.associate = function (models) {
    models.Emotion.hasMany(models.Period, {
      foreignKey: 'emotion_id'
    });
  }
  return Emotion;
};
