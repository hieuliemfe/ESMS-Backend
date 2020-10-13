/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
    const Queue = sequelize.define('Queue', {
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'number'
        },
        statusId: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            field: 'status_id'
        },
        categoryId: {
            type: DataTypes.INTEGER,
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
        tableName: 'queue',
    });
    Queue.associate = function (models) {
        Queue.belongsTo(models.Status, {
            foreignKey: 'status_id',
            as: 'Status'
        });
        Queue.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'Category'
        });
    }

    return Queue;
};
