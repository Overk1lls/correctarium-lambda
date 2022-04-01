import { createApp } from './middleware/app';

const start = async () => {
    const app = createApp();
    app.listen(4000, () => console.log('App is running on port 4000'));
};

start().catch(err => console.error(err));
