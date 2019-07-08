import multer from 'multer';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'upload'),
    filename: async (req, file, cb) => {
      const random = await promisify(randomBytes)(16);
      return cb(null, `${random.toString('hex')}.png`);
    },
  }),
};
