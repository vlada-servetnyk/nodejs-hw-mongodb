import { Router } from "express";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { loginController, registerController } from "../controllers/auth.js";
import { authLoginSchema, authRegisterSchema } from "../validation/auth.js";

export const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(loginController));