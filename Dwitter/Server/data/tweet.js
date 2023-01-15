import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as UserRepository from './auth_repository.js';

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);
useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);


export async function getAll() {
    return Tweet.find().sort({createdAt: -1});

    // return getTweets()
    // .find()
    // .sort({createdAt: -1})  // 역순으로 정렬
    // .toArray()
    // .then(mapTweets);
  }
  
  //! promise 헷갈리는데..?! promise.then 을 return 으로 넘겨도..
  export async function getAllByUsername(username) {
    return Tweet.find({username}).sort({createdAt: -1});

    // return getTweets()
    // .find({username})
    // .sort({createdAt: -1})  // 역순으로 정렬
    // .toArray()
    // .then(mapTweets);
  }
  
  /// '트윗' 아이디로부터 객체 찾기.
  export async function getById(id) {
    return Tweet.findById(id);

    // return getTweets()
    // .findOne({_id: new ObjectId(id)})
    // .then(mapOptionalTweet);


    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found) return null;
    // const {username, name, url} = UserRepository.findById((user) => user.id === found.userId);
    // return {...found, username, name, url};
    //* 아래는 내가 작성한 로직. getAll은 비용이 크기 때문에 위 드림코딩 로직이 더 좋아보임.
    //* 생각해보니까.. 트윗이 많으면, getAll 로직 비효율적인거 아니야..?!
    //* 는... 유저정보 바꿔도 그대로인것 보다는 이게 더 나은거 같긴 하지만 포린키 넣는게 베스트인듯?!
    //! 나중에 질문을 해 보자! 디비 구성 파트까지 보구
    /**
    return getAll().then((tweets) => 
      tweets.find((tweet) => tweet.id === id)
    );
    */
  }
  
  export async function create(text, userId) {
    const {name, username, url} = await UserRepository.findById(userId);
    //ㄴ> NoSQL 에서 중복의 유리함을 위함.

    return Tweet({text, userId, name, username, url}).save();

    // const tweet = {
    //   text,
    //   createdAt: new Date(),
    //   userId, 
    //   name,
    //   username,
    //   url,
    // };
    // return getTweets()
    // .insertOne(tweet)
    // .then((data) => mapOptionalTweet({...tweet, _id: data.insertedId}));
  }
  
  export async function update(id, text) {
    return Tweet.findOneAndUpdate(id, {text}, {returnOriginal: false}); //! id는 doc으로 안만들어도 되나보네..?
    // return getTweets()
    // .findOneAndUpdate(
    //   {_id: new ObjectId(id)},
    //   {$set: {text}},
    //   {returnDocument: 'after'} // default: 'before' 업데이트 이전 문서를 리턴함.
    // )
    // .then((result) => result.value)
    // .then(mapOptionalTweet);
  }
  
  export async function remove(id) {
    return Tweet.findByIdAndDelete(id);
    // return getTweets().deleteOne({_id: new ObjectId(id)});
  }

//   // null 일수도 있는 트윗
//   function mapOptionalTweet(tweet) {
//     return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
//   }

// function mapTweets(tweets) {
//   return tweets.map(mapOptionalTweet);
// }