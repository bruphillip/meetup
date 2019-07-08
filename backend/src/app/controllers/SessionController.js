import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user)
      return res.status(UNAUTHORIZED).json({ error: 'Incorrect email' });

    if (!(await user.checkPassword(password)))
      return res.status(UNAUTHORIZED).json({ error: 'Incorret password' });

    const { secret, expiresIn } = authConfig;
    const { name, id } = user;

    const token = jwt.sign({ id }, secret, {
      expiresIn,
    });

    req.userId = token;

    return res.json({ user: { name, id, email }, token });
  }
}

export default new SessionController();
