import { Router } from "express";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
    loginController,
    logoutController,
    refreshController,
    registerController,
    resetPasswordController,
    sendEmailResetController
    } from "../controllers/auth.js";
import {
    authLoginSchema,
    authRegisterSchema,
    resetPasswordSchema,
    sendEmailResetSchema
} from "../validation/auth.js";

export const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(loginController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/send-reset-email', validateBody(sendEmailResetSchema), ctrlWrapper(sendEmailResetController));

authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));