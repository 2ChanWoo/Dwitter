// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
import { getUsers } from '../database/database.js'
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

  export async function findByUsername(username) {
    return getUsers().findOne({username}).then(mapOptionalUser);
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
    return user ? { ...user, id: user.id } : user;
  }