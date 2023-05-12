import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import cards from './routes/cards';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/v1/cards', cards);
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
