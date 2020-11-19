import { employeeRole, employeeRoleCode } from '../db/models/employee';
import models from '../db/models/index';

function minFourDigits(number) {
    return (number < 1000 ? '000' : '') + number;
}
export const generateEmployeeInfo = async (fullname, roleId, phoneNumber, avatarUrl, counterId) => {
    const currentDate = Date.now();
    let day = new Date(currentDate);
    //Generate fullname:
    const fullnameArray = fullname.toString().split(" ");
    //Generate employee code
    const roleCount = await models.Employee.count({
        where: {
            roleId: roleId
        }
    });
    let employeeCode = '';
    switch (roleId) {
        case employeeRole.MANAGER: {
            employeeCode = employeeRoleCode.MANAGER + minFourDigits((roleCount + 1));
            break;
        }
        case employeeRole.ADMIN: {
            employeeCode = employeeRoleCode.ADMIN + minFourDigits((roleCount + 1));
            break;
        }
        case employeeRole.BANK_TELLER: {
            employeeCode = employeeRoleCode.BANK_TELLER + minFourDigits((roleCount + 1));
            break;
        }
    }
    //Generate email
    const email =
        fullnameArray[fullnameArray.length - 1].toLowerCase() + '.'
        + fullnameArray[0].toLowerCase()
        + day.getMinutes() + day.getSeconds()
        + "@mail.com";

    //password
    const password = Math.random().toString(36).slice(-8);
    //Generate employee
    const employee = {
        employeeCode: employeeCode,
        fullname: fullname,
        password: password,
        email: email,
        roleId: roleId,
        counterId: counterId,
        phoneNumber: phoneNumber,
        avatarUrl: avatarUrl
    }
    return employee;
}