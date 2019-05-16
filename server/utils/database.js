const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb+srv://Olex:Filfktrcfylhalex1@nodejslessons-jhfsw.mongodb.net/test?retryWrites=true';
let db;
// Database Name
const dbName = 'ToDoList';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
const connectToMongo = (cb) => {
  client.connect((err, client) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = client.db(dbName);
    cb()
  });
};

const getDb = () => {
    return db;
};

exports.dbConnect = connectToMongo;
exports.getDb = getDb;
