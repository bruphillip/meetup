import httpStatus from 'http-status';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const created = await User.findOne({ where: { email: req.body.email } });

    if (created) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'User already exists' });
    }

    const { id, email, name } = await User.create(req.body);

    return res.json({ id, email, name });
  }

  async update(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists && emailExists.id !== req.userId) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Email already in use' });
    }

    const { oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ where: 'Incorrect credentials' });
    }
    if (!oldPassword) req.body.password = '';
    await user.update(req.body);

    return res.json(user);
  }
}

export default new UserController();
