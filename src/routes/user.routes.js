import {Router} from 'express';
import { loginUser,registerUser,logoutUser } from '../controllers/user.controller.js';
const router = Router();

router.post('/register',registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;