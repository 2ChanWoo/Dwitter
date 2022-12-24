import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import {validate} from '../middleware/validator.js'

//! const app = express(); 
//.... 하고 get메서드들을 전부 router.get 이 아닌, app.get으로 해서 계속 404발생....
// router를 export하고, app.js 에서는 이걸 use에 callbackFunction 에 넣어줬는데 왜 이런 구조가 가능한 것인지 고찰해보기...

const router = express.Router();

const validateTweet = [
    body('text')
    .trim()
    .isLength({ min: 3})
    .withMessage('text should be at least 3 charactors'),
    validate,
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweeets
router.post('/', validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;

