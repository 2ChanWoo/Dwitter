import Mongoose from 'mongoose';
import { config } from '../config.js';


export async function connectDB() {
    return Mongoose.connect(config.db.host, {dbName: "dwitter"});
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function() {
        return this._id.toString();
    });
    schema.set('toJSON', {virtuals: true}); //toJSON, toObj 할 때에도 위 virtual에 있는 id 변환이 이루어 지도록.
    schema.set('toObject', {virtuals: true});
}

let db;
export function getUsers() {
    return db.collection('users');
  }

  export function getTweets() {
      return db.collection('tweets');
  }