const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../db/models/index');
const status = require('http-status');

import { JWT_SECRET } from '../configurations';
import { DefaultError } from '../utils/errorHandler';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, next) {
    models.User.findOne({
      attributes: [
        'id',
        'username',
        'email',
        'fullname',
        'role_id',
      ],
      where: {
        id: jwt_payload.userId
      }
    }).then(user => {
      if(user) {
        next(null, user);
      } else {
        next('Unauthorized');
      }
    }).catch(err => {
      console.log(err);
      next( 'Something went wrong when trying to authorize you');
    });
  }));
}