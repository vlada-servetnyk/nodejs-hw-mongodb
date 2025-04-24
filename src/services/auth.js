import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import UserCollection from "../db/model/User.js";
import SessionCollection from "../db/model/Session.js";
import {randomBytes} from "node:crypto";
import { accessTokenLifeTime, refreshTokenLifeTime } from "../constants/auth.js";

import jwt from 'jsonwebtoken';
import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendMail.js';


const newSession = () => {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
    const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    };
};

export const findSession = query => SessionCollection.findOne(query);

export const findUser = query => UserCollection.findOne(query);


export const registerUser = async (payload) => {
    const { email, password } = payload;
    const user = await findUser({ email });

    if (user) {
        throw createHttpError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10);

    return await UserCollection.create({...payload, password: hashPassword});
};

export const loginUser = async (payload) => {
    const {email, password} = payload;
    const user = await findUser({ email });
    
    if(!user) {
        throw createHttpError(401, "User not found!");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    };

    await SessionCollection.findOneAndDelete({ userId: user._id });
    
    const session = newSession();

    return SessionCollection.create({
        userId: user._id, 
        ...session,
    });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
    const session = await findSession({refreshToken, _id: sessionId});
    if(!session) {
        throw createHttpError(401, "Session not found");
    };

    if(session.refreshTokenValidUntil < Date.now()) {
        await SessionCollection.findOneAndDelete({_id: session._id});
        throw createHttpError(401, "Session token expired");
    };

    await SessionCollection.findOneAndDelete({ _id: session._id });
    
    const sessionNew = newSession();

    return SessionCollection.create({
        userId: session.userId, 
        ...sessionNew,
    });
};

export const logoutUser = sessionId => SessionCollection.deleteOne({ _id: sessionId });

export const sendEmailReset = async (email) => {
    const user = await UserCollection.findOne({ email });
    
    if (!user) {
        throw createHttpError(404, 'User not found');
    };

    const resetToken = jwt.sign(
        {
        sub: user._id,
        email,
        },
    getEnvVar("JWT_SECRET"),
        {
        expiresIn: '15m',
        },
    );

    await sendEmail({
        from: getEnvVar(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
    });
};