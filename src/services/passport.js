import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import models from '../db/models/index';
import status from 'http-status';

import publicRuntimeConfig from '../configurations';
const JWT_SECRET = publicRuntimeConfig.JWT_SECRET;
import { DefaultError } from '../utils/errorHandler';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

export default passport => {
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
      if (user) {
        next(null, user);
      } else {
        next('Unauthorized');
      }
    }).catch(err => {
      console.log(err);
      next('Something went wrong when trying to authorize you');
    });
  }));
}