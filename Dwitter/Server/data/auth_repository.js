// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
import { getUsers } from '../database/database.js'
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

  export async function findByUsername(username) {
    return getUsers().findOne({username}).then(mapOptionalUser); 
    // 여기서는 왜 맵옵셔널유저를 해서 리턴하는지?
    // 컨트롤러-로그인에서는 아이디를 리턴받아서 토큰을 만드는데,
    // 컨트롤러-사인업에서는 객체로 만드는데..? 질문해보까 -> 아 객체로만드는게 아니라 아래에 있는 createUser 에서 Id를 받아오는거같은데?
    // 아래 createUser 도 솔루션코드랑 다름. 첫번째에서 아이디 투스트링함..
    
    // return users.find((user) => user.username === username);
  }
  
  export async function findById(id) {
    return getUsers().findOne({_id: new ObjectId(id)}).then(mapOptionalUser);
    // return users.find((user) => user.id === id);
  }
  
  export async function createUser(user) {
    getUsers().insertOne(user).then((data) => data.insertedId.toString());
  }
  
  function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user;
  }