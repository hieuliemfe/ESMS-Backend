import { employeeRole, employeeRoleCode } from '../db/models/employee';
import models from '../db/models/index';

function minFourDigits(number) {
    return (number < 1000 ? '000' : '') + number;
}
export const generateEmployeeInfo = async (fullname, role, phoneNumber, avatarUrl, counterId) => {
    avatarUrl = "https://storage.googleapis.com/evidence_stream/avatar_none.png"
    counterId = null
    const currentDate = Date.now();
    let day = new Date(currentDate);
    //Generate fullname:
    const fullnameArray = fullname.toString().split(" ");
    let roleId = undefined
    switch(role) {
        case 'Manager':
            roleId = employeeRole.MANAGER
            break
        case 'Admin':
            roleId = employeeRole.ADMIN
            break
        case 'Bank teller':
            roleId = employeeRole.BANK_TELLER
            break
    }
    //Generate employee code
    let employeeCode = '';
    let prefixCode = ''
    let postfixCode = ''
    await models.Employee.max('employeeCode',
        {
            where: {
                roleId: roleId
            }
        }).then(max =>{
            switch (roleId) {
                case employeeRole.MANAGER: {
                    max = parseInt(max.replace(employeeRoleCode.MANAGER, ''))
                    postfixCode = minFourDigits((max + 1))
                    employeeCode = employeeRoleCode.MANAGER + postfixCode
                    prefixCode = employeeRoleCode.MANAGER                    
                    break;
                }
                case employeeRole.ADMIN: {
                    max = parseInt(max.replace(employeeRoleCode.ADMIN, ''))
                    postfixCode = minFourDigits((max + 1))
                    employeeCode = employeeRoleCode.ADMIN + postfixCode   
                    prefixCode = employeeRoleCode.ADMIN               
                    break;
                }
                case employeeRole.BANK_TELLER: {
                    max = parseInt(max.replace(employeeRoleCode.BANK_TELLER, ''))
                    postfixCode = minFourDigits((max + 1))
                    employeeCode = employeeRoleCode.BANK_TELLER + postfixCode
                    prefixCode = employeeRoleCode.BANK_TELLER
                    break;
                }
            }
        }
    );    
    
    //Generate email
    const email =
        fullnameArray[fullnameArray.length - 1].toLowerCase() + '.'
        + fullnameArray[0].toLowerCase() + '.' + prefixCode.toLocaleLowerCase() + '.' + postfixCode.toLocaleLowerCase()
        + "@esms-team.site";

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