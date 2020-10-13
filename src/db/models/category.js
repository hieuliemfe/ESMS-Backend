/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category_name'
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
        tableName: 'category',
    });

    Category.associate = function (models) {
        Category.hasMany(models.Queue, {
            foreignKey: "category_id"
        });
        Category.belongsToMany(models.Counter, {
            as: 'Counter',
            through: "counter_category",
            foreignKey: 'category_id',
        });
    }
    return Category;
};
