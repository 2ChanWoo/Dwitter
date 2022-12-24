import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';

//! const app = express(); 
//.... 하고 get메서드들을 전부 router.get 이 아닌, app.get으로 해서 계속 404발생....
// router를 export하고, app.js 에서는 이걸 use에 callbackFunction 에 넣어줬는데 왜 이런 구조가 가능한 것인지 고찰해보기...

const router = express.Router();


// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweeets
router.post('/', tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;