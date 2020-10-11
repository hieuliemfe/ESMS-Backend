import { DefaultError } from '../utils/errorHandler';

import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const tokenDecoded = jwt.decode(token)

  models.Employee.findOne({
    attributes: ['roleId', 'isDeleted'],
    where: { id: tokenDecoded.employeeId }
  }).then(employee => {
    if (employee) {
      if (employee.isDeleted) throw new DefaultError(status.FORBIDDEN, 'Account is blocked');
      if (tokenDecoded.roleName !== 'Admin') throw new DefaultError(status.FORBIDDEN, 'Error Forbidden');
      next(null, employee);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    next(err)
  });
}
export const isManager = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const tokenDecoded = jwt.decode(token)

  models.Employee.findOne({
    attributes: ['roleId', 'isDeleted'],
    where: { id: tokenDecoded.employeeId }
  }).then(employee => {
    if (employee) {
      if (employee.isDeleted) throw new DefaultError(status.FORBIDDEN, 'Account is blocked');
      if (tokenDecoded.roleName !== 'Manager') throw new DefaultError(status.FORBIDDEN, 'Error Forbidden');
      next(null, employee);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    next(err)
  });
}

export const isEmployee = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const tokenDecoded = jwt.decode(token)

  models.Employee.findOne({
    attributes: ['roleId', 'isDeleted'],
    where: { id: tokenDecoded.employeeId }
  }).then(employee => {
    if (employee) {
      if (employee.isDeleted) throw new DefaultError(status.FORBIDDEN, 'Account is blocked');
      if (tokenDecoded.roleName !== 'Employee') throw new DefaultError(status.FORBIDDEN, 'Error Forbidden');
      next(null, employee);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    next(err)
  });
}

export function isAuthorized(req, res, next) {
  models.Employee.findOne({
    attributes: [
      'role_id',
    ],
  }).then(employee => {
    if (employee) {
      next(null, employee);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    throw new DefaultError(status.INTERNAL_SERVER_ERROR, 'Something went wrong when trying to authorize you', err);
  });
}