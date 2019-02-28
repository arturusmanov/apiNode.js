var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // переменная веб-сервера

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods ", "POST, PUT, GET, OPTIONS");
  next();
});

var artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Maiden'
  },
  {
    id: 3,
    name: 'Deep Purple'
  }
];


// Когда заходим на /, отробатывает func req- request, res - response, send - отправить ответ
app.get('/', function (req, res) {
  res.send('Hello API')
})

app.get('/artists', function (req, res){
  res.send(artists);
})

app.get('/artist/:id/show', function(req, res){
  var artist = artists.find(function(artist){
    return artist.id === Number(req.params.id)
  })
  // console.log(req.params);
  res.send(artist);
})

app.post('/artists', async function(req, res){
  var artist = {
    id: Date.now(),
    name: req.body.name
  };

  var one = function(){
    artists.push(artist)

  }

  await setTimeout(one, 1000);

  res.send(artist)
  // console.log(req.body);
  // res.send('post data');
})

app.put('/artist/:id/edit', function(req, res){
  var editArtist = artists.find(function(artist){
    return artist.id === Number(req.params.id)
  });

  editArtist.name = req.body.name;
  res.send(editArtist);
})

app. listen(3012, function(){
  console.log('API app started');
})