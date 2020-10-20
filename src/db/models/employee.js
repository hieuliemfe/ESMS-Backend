/* jshint indent: 1 */
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      field: 'id',
    },
    employeeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'employee_code'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
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
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_subscribed'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_deleted'
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      field: 'updated_at'
    }
  }, {
    tableName: 'employee',
    hooks: {
      // This hook is called when an entry is being added to the back end.
      // This method is used to hash the password before storing it
      // in our database.
      beforeCreate: (employee, options) => {
        const SALT_WORK_FACTOR = 10;
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(employee.password, salt);
        employee.password = hash;
      },
      beforeBulkCreate: (employees, options) => {
        for (const employee of employees) {
          const SALT_WORK_FACTOR = 10;
          const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
          const hash = bcrypt.hashSync(employee.password, salt);
          employee.password = hash;
        }
      }
    }
  });

  Employee.associate = function (models) {
    //Each employee will have a role.
    Employee.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'Role'
    });
    //An employee will have many shifts with customers.
    Employee.hasMany(models.Shift, {
      foreignKey: 'employee_id'
    });
  }
  return Employee;
};
