const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wine_model.js');
const bodyParser = require('body-parser').json();
const error_handler = require(__dirname + '/../lib/error_handler.js');

var wineRouter = module.exports = new Router();


wineRouter.get('/wine', (req, res) => {
  console.log('/wine GET route works!');
  Wine.find(null, (err, data) => {
    if (err) return error_handler(err, res);
    res.status(200).json(data);
  });
});

wineRouter.post('/wine', bodyParser, (req, res) => {
  console.log('/wine POST route works!');
  var newWine = new Wine(req.body);
  newWine.save((err, data) => {
    if (err) return error_handler(err, res);
    res.status(200).json(data);
  });
});

wineRouter.put('/wine/:id', bodyParser, (req, res) => {
  var wineData = req.body;
  delete wineData._id;
  Wine.update({ _id: req.params.id }, wineData, (err) => {
    if (err) return error_handler(err, res);
    res.status(200).json({ msg: 'Put that wine' });
  });
});

wineRouter.delete('/wine/:id', (req, res) => {
  Wine.remove({ _id: req.params.id }, (err) => {
    if (err) return error_handler(err, res);
    res.status(200).json({ msg: 'Drink that wine' });
  });
});
