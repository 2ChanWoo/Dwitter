import express from 'express';
import 'express-async-errors';

//! const app = express(); 
//.... 하고 get메서드들을 전부 router.get 이 아닌, app.get으로 해서 계속 404발생....
// router를 export하고, app.js 에서는 이걸 use에 callbackFunction 에 넣어줬는데 왜 이런 구조가 가능한 것인지 고찰해보기...

const router = express.Router();

const tweets = [{
    id: '1',
    text: 'content is!',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/router/uploads/2019/11/free-profile-photo-whatsrouter-1.png',
}];

router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username ? tweets.filter((t) => t.username === username) : tweets;


    res.status(200).json(data);
});

router.get('/:id', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

export default router;