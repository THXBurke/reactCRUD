const Router = require('express').Router;
const Wine = require(__dirname + '/..models/wine_model.js');
const bodyParser = require('body-parser').json();
const errorhandler = require(__dirname + '/lib/error_handler.js');

var wineRouter = module.exports = new Router();


wineRouter.post('/wine', bodyParser, (req, res) => {
  var newWine = new Wine(req.body);
  newWine.save((err, data) => {
    if (err) return errorhandler(err, res);
    res.status(200).json(data);
  });
});

wineRouter.get('/wine', (req, res) => {
  Wine.find({}, (err, data) => {
    if (err) return errorhandler(err, res);
    res.status(200).json(data);
  });
});
