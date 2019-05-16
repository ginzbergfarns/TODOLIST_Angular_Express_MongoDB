const dbUtil = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;

class Task {
  constructor(title, deadline, category, description, priority, done, failed, userId, id = null) {
    this.title = title;
    this.deadline = deadline;
    this.category = category;
    this.description = description;
    this.priority = priority;
    this.done = done;
    this.failed = failed;
    this.userId = userId;
    if (id) {
      this._id = new ObjectId(id);
    }
  }

  save() {
    const db = dbUtil.getDb();
    return db.collection('tasks').insertOne(this)
  }

  update() {
    const db = dbUtil.getDb();
    console.log(this._id);
    return db.collection('tasks').findOneAndUpdate({_id: this._id}, {$set: this}, {upsert: true})
  }

  static deleteById(id) {
    const db = dbUtil.getDb();
    return db.collection('tasks').findOneAndDelete({_id: new ObjectId(id)});
  }

  static fetchAll(userId) {
    const db = dbUtil.getDb();
    return db.collection('tasks').find({userId: userId})
      .sort({priority: 1})
      .toArray();
  }

  static filter(targetUserId, targetCategory) {
    const db = dbUtil.getDb();
    if (targetCategory === undefined) {
      return db.collection('tasks').find({userId: targetUserId, priority: {$lt: 70}}).toArray();
    } else {
      return db.collection('tasks').find({category: targetCategory, userId: targetUserId, priority: {$lt: 70}}).toArray();
    }
  }
}

module.exports = Task;
