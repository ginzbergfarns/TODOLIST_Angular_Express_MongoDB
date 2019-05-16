const Task = require('../models/task.models');

exports.getAllTask = (req, res, next) => {
  Task.fetchAll()
    .then(tasks => {
      const tasksObject = {};
      tasksObject.priorityTasks = tasks.length > 0 ? tasks.map(task => task.priority >= 70) : [];
      tasksObject.lowPriorityTasks = tasks.length > 0 ? tasks.map(task => task.priority < 70): [];
      res.send(tasksObject);
    })
    .catch(err => {
      res.send(500).send(err)
    })
};

exports.updateTask = (req, res, next) => {
  const task = new Task(
    req.body.title,
    req.body.date,
    req.body.category,
    req.body.description,
    req.body.priority,
    req.body.done,
    req.body.failed,
    req.user._id,
    req.body._id
  );
  task.update()
    .then(() => {
      req.send({message: 'Success'})
    })
    .catch(err => {
      req.status(300).send(err);
    })
};

exports.addTask = (req, res, next) => {
  const task = new Task(
    req.body.title,
    req.body.date,
    req.body.category,
    req.body.description,
    req.body.priority,
    false,
    false,
    req.user._id
  );
  task.save()
    .then((task) => {
      req.send(task.ops[0])
    })
    .catch(err => {
      req.status(300).send(err);
    })
};

exports.deleteTask = (req, res, next) => {
  Task.deleteById(req.params.taskId)
    .then(() => {
      req.send({message: 'Success'})
    })
    .catch(err => {
      req.status(300).send(err);
    })
};
