import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth_repository.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

// const SELECT_JOIN =
//   'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });

  // return db
  //   .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
  //  .then((result) => result[0]);
}

  //! promise 헷갈리는데..?! promise.then 을 return 으로 넘겨도..  => then을 넘겨도 되는거야?
export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,  //! include 가 중복되도 괜찮은가 본데...?
      where: { username },
    },
  });
  // return db
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
  //   .then((result) => result[0]);
}

  /// '트윗' 아이디로부터 객체 찾기.
export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
  // return db
  //   .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
  //   .then((result) => result[0][0]);
    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found) return null;
    // const {username, name, url} = userRepository.findById((user) => user.id === found.userId);
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

  return Tweet.create({ text, userId }) //
    .then((data) => this.getById(data.dataValues.id));

  // console.log(Date.now().toString());
  // console.log(new Date().toString());
  // console.log(Date().toString());  
  // console.log(new Date());  
  //! what defference? about keyword 'new'
  // return db
  //   .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
  //     text,
  //     new Date(),
  //     userId,
  //   ])
  //   .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER) //
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
  // return db
  //   .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
  //   .then(() => getById(id));
}

export async function remove(id) {
  return Tweet.findByPk(id) //
    .then((tweet) => {
      tweet.destroy();
    });
  // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}