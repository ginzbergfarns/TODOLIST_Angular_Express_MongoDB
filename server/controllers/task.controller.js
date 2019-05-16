const Task = require('../models/task.models');

exports.getAllTask = (req, res, next) => {
  Task.fetchAll(req.user._id)
    .then(tasks => {
      res.send(tasks.length > 0 ? tasks : []);
    })
    .catch(err => {
      res.send(500).send(err)
    })
};

exports.updateTask = (req, res, next) => {
  const task = new Task(
    req.body.title,
    req.body.deadline,
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
      res.send({message: 'Success'})
    })
    .catch(err => {
        console.log(err);
      res.status(300).send(err);
    })
};

exports.filterByCategory = (req, res, next) => {
  if (req.body.category) {
    Task.filter(req.user._id, req.body.category)
      .then(tasks => {
        res.send(tasks);
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    res.redirect(`/api/${req.user._id}/get`)
  }

};

exports.addTask = (req, res, next) => {
  const task = new Task(
    req.body.title,
    req.body.deadline,
    req.body.category,
    req.body.description,
    req.body.priority,
    false,
    false,
    req.user._id
  );
  task.save()
    .then((task) => {
      res.send(task.ops[0])
    })
    .catch(err => {
      console.log(err);
      res.status(300).send(err);
    })
};

exports.deleteTask = (req, res, next) => {
  Task.deleteById(req.params.taskId)
    .then(() => {
      res.send({message: 'Success'})
    })
    .catch(err => {
      res.status(300).send(err);
    })
};
