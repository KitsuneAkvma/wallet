import express from 'express';
export const usersRouter = express.Router();
import {
  registration,
  login,
  logout,
  verifyEmail,
  secondVerifyEmail,
  signout,
  auth,
} from '../services/controllers/authOperations.js';
import { currentUser } from '../services/controllers/usersOperations.js';

usersRouter.get('/current', auth, currentUser);

usersRouter.post('auth/sign-up', registration);

usersRouter.get('/verify/:verificationToken', verifyEmail);

usersRouter.post('/verify/', secondVerifyEmail);

usersRouter.post('auth/log-in', login);

usersRouter.post('auth/log-out', auth, logout);

usersRouter.delete('auth/sign-out', auth, signout);
