/* jshint indent: 1 */

export default function (sequelize, DataTypes) {
    const Status = sequelize.define('Status', {
        statusName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'status_name'
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
        tableName: 'status',
    });

    Status.associate = function (models) {
        models.Status.hasMany(models.Task, {
            foreignKey: "status_id"
        });
        models.Status.hasMany(models.Queue, {
            foreignKey: "status_id"
        });
    }
    return Status;
};
