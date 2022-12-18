import express from 'express';
import fs from 'fs/promises';
import {} from 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ['원하는주소?'],
    optionsSuccessStatus: 200,
    credentials: true, // Access-Cross-Allow-Credentials : true
}));

app.get('/', (req,res,next) => {
    console.log('first');
    next();
}, (req,res,next) => {
    console.log('first2');
    next();
});
app.get('/', (req,res,next) => {
    console.log('second');
    return fs.readFile('asd');  
    //express-async-errors를 import만 해 줘도 비동기 처리가 가능함.
    //! 단, 미들웨어에서 promise 를 return 하는 경우에만.
});

app.all((req,res,next) => {
    res.send('404');
});
app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json({ message: 'Error occured'});
});
app.listen(8080);