const express = require('express');
const db = require('./utils/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const bodyParser = require('body-parser');
const User = require('./models/user.models');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        return Promise.reject('Please login sir');
      }
    })
    .catch(err => {
      res.status(401).send(err);
    })
});
app.use('/api/', taskRoutes);



db.dbConnect(() => {
  app.listen(3000);
});
