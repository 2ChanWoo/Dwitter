import * as userRepository from './auth_repository.js';

let tweets = [
    {
      id: '1',
      text: '드림코더분들 화이팅!',
      createdAt: new Date().toString(),
      userId: '1'
    },
    {
      id: '2',
      text: '안뇽!',
      createdAt: Date.now().toString(),
      userId: '2'
    },
  ];
  
  export async function getAll() {
    return Promise.all(
      tweets.map(async (tweet) => {
        const {username, name, url} = await userRepository.findById(tweet.userId);
        return {...tweet, username, name, url};
      })
    );
  }
  
  //! promise 헷갈리는데..?! promise.then 을 return 으로 넘겨도..
  export async function getAllByUsername(username) {
    return getAll().then((tweets) => 
      tweets.filter((tweet) => tweet.username === username)
    );
  }
  
  /// '트윗' 아이디로부터 객체 찾기.
  export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found) return null;
    const {username, name, url} = userRepository.findById((user) => user.id === found.userId);
    return {...found, username, name, url};
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
  
  export async function create(text, name, username) {
    const tweet = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
      userid,
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
  }
  
  export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
      tweet.text = text;
    }
    return getById(tweet.id);
  }
  
  export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
  }