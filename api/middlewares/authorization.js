import { DefaultError } from '../utils/errorHandler';

const models = require('../db/models/index');
const status = require('http-status');
const jwt = require('jsonwebtoken');

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const tokenDecoded = jwt.decode(token)

  models.User.findOne({
    attributes: ['roleId', 'isDeleted'],
    where: { id: tokenDecoded.userId }
  }).then(user => {
    if (user) {
      if (user.isDeleted) throw new DefaultError(status.FORBIDDEN, 'Account is blocked');
      if (tokenDecoded.roleName !== 'admin') throw new DefaultError(status.FORBIDDEN, 'Error Forbidden');
      next(null, user);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    next(err)
  });
}

export function isUser(req, res, next) {
  models.User.findOne({
    attributes: [
      'role_id',
    ],
    where: {
      roleId: 1
    }
  }).then(user => {
    if(user) {
      next(null, user);
    } else {
      throw new DefaultError(status.UNAUTHORIZED, 'You are not authorized to perform this action!');
    }
  }).catch(err => {
    throw new DefaultError(status.INTERNAL_SERVER_ERROR, 'Something went wrong when trying to authorize you', err);
  });  
}