import * as Yup from 'yup';
import { BAD_REQUEST } from 'http-status';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      )
      .when('confirmPassword', (confirmPassword, field) =>
        confirmPassword ? field.required() : field
      ),
    confirmPassword: Yup.mixed().test(
      'match',
      `password doesn't match`,
      function compare(password) {
        return password === this.parent.password;
      }
    ),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(BAD_REQUEST).json({ error: 'Validation fails' });
  }

  return next();
};
