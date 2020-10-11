
/* jshint indent: 1 */

import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
            field: 'id',
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'employee_code'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'email'
        },
        fullname: {
            type: DataTypes.STRING,
            field: 'fullname'
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: 'phone_number'
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avatar_url'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_deleted'
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
        tableName: 'customer',
    });

    Customer.associate = function (models) {
        //A customer may go to the bank multiple times.
        Customer.hasMany(models.Session, {
            foreignKey: 'customer_id'
        });
    }
    return Customer;
};
