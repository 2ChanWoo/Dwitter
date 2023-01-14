import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;

  const tweet = await tweetRepository.getById(id);
  if(!tweet) return res.sendStatus(404);
  if(tweet.userId !== req.userId) return sendStatus(403); //! 403:로그인 된 사용자 이지만, 요청에 권한이 없을 경우

  const text = req.body.text;
  const updatedTweet = await tweetRepository.update(id, text);
    res.status(200).json(updatedTweet);
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;

  const tweet = await tweetRepository.getById(id);
  if(!tweet) return res.sendStatus(404);
  if(tweet.userId !== req.userId) return res.sendStatus(403);


  await tweetRepository.remove(id);
  res.sendStatus(204);
}