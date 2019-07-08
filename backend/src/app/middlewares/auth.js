import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({
      error: 'Token not provided',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};
