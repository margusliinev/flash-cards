import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
const app: Express = express();
const port = process.env.PORT;
import router from './routes/cards';

app.use(express.json());
app.use('/api/v1/cards', router);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
