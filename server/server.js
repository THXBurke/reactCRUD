const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/wine_app_dev');

const wineRouter = require(__dirname + '/routes/wine_router');

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const wineRouter = require(__dirname + '/routes/wineRouter');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});
app.use('/api', wineRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Good things happen at http://localhost: ' + PORT));
