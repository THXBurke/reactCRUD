const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wine_db');
app.listen(port, () => console.log('good things happen at port:' + port));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const wineRouter = require(__dirname + '/routes/winerouter.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});

app.use('/api', wineRouter);
