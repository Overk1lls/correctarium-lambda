import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import textRoute from './routes/text';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/api/text', textRoute);

    return app;
};