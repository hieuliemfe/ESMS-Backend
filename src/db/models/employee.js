/* jshint indent: 1 */
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize';

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
      type: DataTypes.TEXT,
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
    counterId: {
      type: DataTypes.INTEGER,
      unique: false,
      field: 'counter_id'
    },
    appointments:{
      type: DataTypes.TEXT,
      unique: false,
      field: 'appointments'
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
    Employee.hasMany(models.EmployeeShift, {
      foreignKey: 'employee_id'
    });
    //An employee may have many suspensions.
    Employee.hasMany(models.Suspension, {
      foreignKey: 'employee_id'
    });
    //A counter can have many shifts
    Employee.belongsTo(models.Counter, {
      //counter_id
      targetKey: 'id',
      foreignKey: 'counter_id',
      as: 'Counter'
    });
  }
  return Employee;
};

export const employeeRoleCode = {
  ADMIN: 'AD',
  MANAGER: 'MG',
  BANK_TELLER: 'BT'
}
export const employeeRole = {
  ADMIN: 1,
  MANAGER: 2,
  BANK_TELLER: 3
}