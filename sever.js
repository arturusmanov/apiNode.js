var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');

var app = express(); // переменная веб-сервера

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods ", "POST, PUT, GET, OPTIONS");
  next();
});

// Когда заходим на /, отробатывает func req- request, res - response, send - отправить ответ
app.get('/', function (req, res) {
  res.send('Hello API')
})

app.get('/artists', function(req, res){
  db.get().collection('artists').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500)
    }
    res.send(docs);
  })
})

app.get('/artist/:id/show', function(req,res){
  db.get().collection('artists').findOne({ _id: ObjectID(req.params.id)}, function(err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

app.post('/artists', function(req, res){
  var artist = {
    name: req.body.name
  };

  db.get().collection('artists').insert(artist, function(err, result){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  })
})

app.put('/artist/:id/edit', function (req, res){
  db.get().collection('artists').updateOne(
      { _id: ObjectID(req.params.id) },
      { name: req.body.name },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
  )
})

app.delete('/artist/:id/delete', function(req, res){
  db.get().collection('artists').deleteOne(
      { _id: ObjectID(req.params.id) },
      function (err, result) {
        if (err) {
          console.log(err)
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
  )
})

db.connect('mongodb://localhost:27017/myapi', function(err){
  if(err){
    return console.log(err);
  }
  app.listen(3012, function(){
    console.log('API app started');
  })
})
