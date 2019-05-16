const User = require('../models/user.models');


exports.postAddUser = (req, res, next) => {
  const user = new User(
    req.body.userEmail,
    req.body.userPassword,
    req.body.userName,
    req.body.userSurname,
  );

  user.save()
    .then((user) => {
      res.send(user.ops[0])
    })
    .catch(err => {
      res.status(401).send(err);
    })
};

exports.logIn = (req, res, next) => {
  const user = new User(
    req.body.userEmail,
    req.body.userPassword
  );

  user.logIn()
    .then((user) => {
      res.send(user);
    })
    .catch(err => res.status(401).send(err))

};

exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send(user)
    })
    .catch(err => console.log(err))
};
