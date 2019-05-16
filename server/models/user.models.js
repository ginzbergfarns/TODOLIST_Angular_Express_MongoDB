const dbUtil = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;

class User {

  constructor(email, password, name, surname, id = null) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this._id = id;
  }

  save() {
    const db = dbUtil.getDb();
    return db.collection('users').findOne({email: this.email})
      .then((user) => {
        if (user) {
          return Promise.reject('This user already exist');
        } else {
          return db.collection('users').insertOne(this);
        }
      })
  }

  logIn() {
    const db = dbUtil.getDb();
    return db.collection('users').findOne({email: this.email, password: this.password})
      .then((user) => {
        if (!user) {
          return Promise.reject('User not exist');
        } else {
          return user;
        }
      })
  }

  static findById(id) {
    const db = dbUtil.getDb();
    return db.collection('users').findOne({_id: new ObjectId(id)})
  }
}

module.exports = User;
