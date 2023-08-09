import express from 'express';
import {
    loginHandler,
    logoutHandler,
    refreshHandler,
    registerHandler,
} from '@controllers/auth.controller';
import validate from '@schemas/schema.validate';
import { loginUserSchema, createUserSchema } from '@schemas/schema.createUser';
import { authenticate } from '@middleware/deserializeUser';
import { requireUser } from '@middleware/requireUser';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerHandler);

router.post('/login', validate(loginUserSchema), loginHandler);

// router.use(authenticate, requireUser);

router.get('/refresh', authenticate, requireUser, refreshHandler);

router.get('/logout', authenticate, requireUser, logoutHandler);

export default router;
