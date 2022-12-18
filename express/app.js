import express from 'express';
import fs from 'fs/promises';

const app = express();

app.get('/', (req,res,next) => {
    console.log('first');
    next();
}, (req,res,next) => {
    console.log('first2');
    next();
});
app.get('/', (req,res,next) => {
    console.log('second');
    fs.readFile('asd');
});

app.all((req,res,next) => {
    res.send('404');
});
app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json({ message: 'Error occured'});
});
app.listen(8080);