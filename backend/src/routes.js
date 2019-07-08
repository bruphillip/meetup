import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
/** Middlewares */
import authorization from './app/middlewares/auth';
import userValidation from './app/middlewares/userValidation';
import sessionValidation from './app/middlewares/sessionValidation';

/** Controllers */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

/** Routes */
const routes = Router();
const upload = multer(multerConfig);

routes.post('/users', userValidation, UserController.store);
routes.post('/authenticate', sessionValidation, SessionController.store);

routes.use(authorization);
routes.put('/users', userValidation, UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
