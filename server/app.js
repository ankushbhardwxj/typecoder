const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8080;
// fetch routes
const authRoutes = require('./routes/auth');
const userInfoRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/typecode', {
  useNewUrlParser: true,
});
mongoose.set('debug', true);

const db = mongoose.connection;
db.on('error', () => console.log('Failed to connect to DB'));
db.once('open', () => console.log('Successfully connected to DB'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET',
    );
    return res.status(200).json({});
  }
  next();
});
app.use('/user', authRoutes);
app.use('/users', userInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
