import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { contactRouter } from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import {authRouter} from './routers/auth.js';

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(pinoHttp());

    app.get('/', (req, res) => {
        res.json({
            message: 'Server start successfully'
        });
    });

    app.use('/contacts', contactRouter);

    app.use("/auth", authRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);
    
    const PORT = Number(getEnvVar("PORT"));
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};