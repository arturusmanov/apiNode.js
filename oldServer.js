var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID

var app = express(); // переменная веб-сервера
var db;

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
  db.collection('artists').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500)
    }
    res.send(docs);
  })
})

app.get('/artist/:id/show', function(req,res){
  db.collection('artists').findOne({ _id: ObjectID(req.params.id)}, function(err, doc) {
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

  db.collection('artists').insert(artist, function(err, result){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  })
})

app.put('/artist/:id/edit', function (req, res){
  db.collection('artists').updateOne(
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
  db.collection('artists').deleteOne(
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

// app.put('/artist/:id/edit', function(req, res){
//   var editArtist = artists.find(function(artist){
//     return artist.id === Number(req.params.id)
//   });
//
//   editArtist.name = req.body.name;
//   res.send(editArtist);
// })

// app.delete('/artist/:id/delete', function (req, res){
//   artists = artists.filter(function(artistDelete){
//     return artistDelete.id != Number(req.params.id);
//   })
//   res.sendStatus(200);
// })

MongoClient.connect('mongodb://localhost:27017/myapi', function(err, database){
  if(err){
    return console.log(err);
  }
  db = database.db('myapi')

  app.listen(3012, function(){
    console.log('API app started');
  })
})








// var artists = [
//   {
//     id: 1,
//     name: 'Metallica'
//   },
//   {
//     id: 2,
//     name: 'Iron Maiden'
//   },
//   {
//     id: 3,
//     name: 'Deep Purple'
//   }
// ];

// app.get('/artists', function (req, res){
//   var artistsFunc = function(){
//     res.send(artists);
//   }
//   setTimeout(artistsFunc, 2000);
// })

// app.get('/artist/:id/show', function(req, res){
//   var artist = artists.find(function(artist){
//     return artist.id === Number(req.params.id)
//   })
//   // console.log(req.params);
//   res.send(artist);
// })

///////////////////////////////////////////// POST без БД
// var funcPost = async function(req, res){
//   var artist = {
//     id: Date.now(),
//     name: req.body.name
//   };
//
//   var one = function(){
//     artists.push(artist)
//     // res.send(artist)
//     res.sendStatus(504)
//   }
//
//   await setTimeout(one, 2);
//
//
//   // console.log(req.body);
//   // res.send('post data');
// }
//
// var funcPost1 = function() {
//   setTimeout(funcPost, 20);
// }
//
// app.post('/artists', funcPost)
/////////////////////////////////////////////

// app.listen(3012, function(){
//   console.log('API app started');
// })
//
// app.timeout = 5000;

