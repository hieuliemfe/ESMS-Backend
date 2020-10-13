/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
    const TaskType = sequelize.define('TaskType', {
        typeName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'type_name'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id'
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
        tableName: 'task_type',
    });

    TaskType.associate = function (models) {
        TaskType.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'Category'
          });
    }
    return TaskType;
};
