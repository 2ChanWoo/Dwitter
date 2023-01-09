import express from 'express';
import cors from 'cors';
import morgan  from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import dotenv from 'dotenv';

import tweetsRouter from './router/tweet.js';
import authRouter from './router/auth_router.js';
import { config } from './config.js';
import { connectDB } from './database/database.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('[:date] :remote-addr :method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());


app.use('/', (req, res, next) => {
    console.log('\nnew request!!');
    console.log(req.body);
    console.log(req.url);
    next();
});
app.use('/tweets', tweetsRouter);
app.use('/Auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

connectDB().then((db) => {
    console.log('init!', db);
    app.listen(config.host.port);
}).catch(console.error);