import express from 'express';

const app = express();

const port = 8080;

app.use((req,res,next) => {
    res.send("asd");
});

app.listen(port);