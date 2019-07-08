import * as Yup from 'yup';
import { BAD_REQUEST } from 'http-status';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(BAD_REQUEST).json({ error: 'Validation fails ' });
  }
  return next();
};
