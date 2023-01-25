import express from 'express';
import cors from 'cors';
import morgan  from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import dotenv from 'dotenv';
import yaml from 'yamljs';
import swaggerUI from 'swagger-ui-express';

import tweetsRouter from './router/tweet.js';
import authRouter from './router/auth_router.js';
import { config } from './config.js';
import { sequelize } from './db/database.js';

const app = express();
dotenv.config();

const corsOption = {
    origin: config.cors.allowdOrigin,
    optionsSuccessStatus: 200,
}

const openAIPDocument = yaml.load('./api/openapi.yaml');

app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('[:date] :remote-addr :method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());


app.use('/', (req, res, next) => {
    console.log('\nnew request!!');
    console.log(req.body);
    console.log(req.url);
    next();
});



app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAIPDocument));
app.use('/tweets', tweetsRouter);
app.use('/Auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

sequelize
.sync()
.then((client) => {
    console.log(`Server started ... ${new Date()}`);
    // console.log(client);
    app.listen(config.port);
});