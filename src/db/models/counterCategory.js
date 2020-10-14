/* jshint indent: 1 */
export default function (sequelize, DataTypes) {
    const CounterCategory = sequelize.define('CounterCategory', {
        counterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'counter_id'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id'
        },
    }, {
        tableName: 'counter_category',
    });
    CounterCategory.removeAttribute('id');
    return CounterCategory;
};
