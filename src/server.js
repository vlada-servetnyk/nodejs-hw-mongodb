import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import 'dotenv/config';
import { getContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(pinoHttp());

    app.get('/', (req, res) => {
        res.json({
            message: 'Server start successfully'
        });
    });

    app.get('/contacts', async (req, res) => {
        const data = await getContacts();
        
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data
        })
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        
        const data = await getContactById(contactId);

        if(!data) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        };

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data
        });

    })

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        })
    });
    
    const PORT = Number(process.env.PORT);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};