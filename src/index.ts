import express from 'express';
import cors from 'cors';
import text from './routes/text';

const app = express();

app.use(cors());
app.use(express.json());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currDate = new Date();
    console.log(currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds(), req.method, req.path);
    next();
});
app.use('/api/text', text);

if (process.env.NODE_ENV != 'test ') app.listen(4000, () => console.log('App is running on port 4000'));

export { app };